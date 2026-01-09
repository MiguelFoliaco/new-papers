'use client';

import { useTranslations } from "@/languages/context";
import { useEditor, useNode } from "@craftjs/core";
import {
    DraftEditorCommand,
    Editor,
    EditorState,
    RichUtils,
    convertFromRaw,
    convertToRaw,
    RawDraftContentState,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from "react";

import {
    BiBold,
    BiItalic,
    BiUnderline,
    BiStrikethrough,
    BiCode,
    BiListUl,
    BiListOl,
    BiCodeBlock,
    BiSolidQuoteAltLeft,
} from "react-icons/bi";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";

type Props = {
    raw?: RawDraftContentState | null;
};

export const Text = ({ raw }: Props) => {
    const { enable } = useEditor(state => ({
        enable: state.options.enabled,
    }));

    const { t } = useTranslations('studio');
    const {
        connectors: { connect, drag },
        actions: { setProp },
    } = useNode();

    /* Init editor */
    const [editorState, setEditorState] = useState(() =>
        raw
            ? EditorState.createWithContent(convertFromRaw(raw))
            : EditorState.createEmpty()
    );

    /* Sync when props change (importante al cargar JSON) */
    useEffect(() => {
        if (raw) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEditorState(
                EditorState.createWithContent(convertFromRaw(raw))
            );
        }
    }, [raw]);

    /* Persist editor state to Craft props */
    const onChange = (state: EditorState) => {
        setEditorState(state);

        const content = state.getCurrentContent();
        const rawContent = convertToRaw(content);

        setProp((props: Props) => {
            props.raw = rawContent;
        });
    };

    const handleKeyCommand = (
        command: DraftEditorCommand,
        state: EditorState
    ) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    /* Inline styles */
    const toggleInline = (style: string) => {
        onChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    /* Block styles */
    const toggleBlock = (block: string) => {
        onChange(RichUtils.toggleBlockType(editorState, block));
    };

    return (
        <div
            ref={ref => {
                if (ref) connect(drag(ref as HTMLElement));
            }}
            className="text-paper-news transition-all border border-primary/20 hover:border-primary p-2 flex flex-col gap-2"
            style={{
                border: enable ? undefined : 'none',
            }}
        >
            <Editor
                placeholder={t('placeholder')}
                readOnly={!enable}
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
            />

            {enable && (
                <div className="flex flex-wrap items-center gap-1 border-t border-base-content/10 pt-2">

                    {/* Inline */}
                    <ToolbarButton onClick={() => toggleInline('BOLD')} icon={<BiBold />} />
                    <ToolbarButton onClick={() => toggleInline('ITALIC')} icon={<BiItalic />} />
                    <ToolbarButton onClick={() => toggleInline('UNDERLINE')} icon={<BiUnderline />} />
                    <ToolbarButton onClick={() => toggleInline('STRIKETHROUGH')} icon={<BiStrikethrough />} />
                    <ToolbarButton onClick={() => toggleInline('CODE')} icon={<BiCode />} />

                    <Divider />

                    {/* Blocks */}
                    <ToolbarButton onClick={() => toggleBlock('header-one')} icon={<LuHeading1 />} />
                    <ToolbarButton onClick={() => toggleBlock('header-two')} icon={<LuHeading2 />} />
                    <ToolbarButton onClick={() => toggleBlock('header-three')} icon={<LuHeading3 />} />
                    <ToolbarButton onClick={() => toggleBlock('blockquote')} icon={<BiSolidQuoteAltLeft />} />
                    <ToolbarButton onClick={() => toggleBlock('unordered-list-item')} icon={<BiListUl />} />
                    <ToolbarButton onClick={() => toggleBlock('ordered-list-item')} icon={<BiListOl />} />
                    <ToolbarButton onClick={() => toggleBlock('code-block')} icon={<BiCodeBlock />} />
                </div>
            )}
        </div>
    );
};

/* Toolbar UI */
const ToolbarButton = ({
    onClick,
    icon,
}: {
    onClick: () => void;
    icon: React.ReactNode;
}) => (
    <button
        type="button"
        onMouseDown={e => {
            e.preventDefault();
            onClick();
        }}
        className="btn-figma"
    >
        {icon}
    </button>
);

const Divider = () => (
    <span className="w-px h-5 bg-base-content/20 mx-1" />
);

/* Craft config */
Text.craft = {
    displayName: 'Text',
    props: {
        raw: null,
    },
};
