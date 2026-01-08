'use client'

import { useNode } from "@craftjs/core";
import {
    ContentState,
    DraftEditorCommand,
    Editor,
    EditorState,
    RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useState } from "react";
import {
    BiBold,
    BiItalic,
    BiUnderline,
    BiStrikethrough,
    BiCode,
    BiListUl,
    BiListOl,
    BiHeading,
    BiCodeBlock,
    BiSolidQuoteAltLeft,
} from "react-icons/bi";

type Props = {
    text: string;
};

export const Text = ({ text }: Props) => {
    const { connectors: { connect, drag } } = useNode();

    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(
            ContentState.createFromText(text)
        )
    );

    const handleKeyCommand = (
        command: DraftEditorCommand,
        editorState: EditorState
    ) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    /* Inline styles */
    const toggleInline = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    /* Block styles */
    const toggleBlock = (block: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, block));
    };

    return (
        <div
            className="transition-all border border-primary/20 hover:border-primary p-2 flex flex-col gap-2"
            ref={ref => {
                if (ref) {
                    connect(drag(ref as HTMLElement))
                }
            }}
        >
            <Editor
                editorState={editorState}
                onChange={setEditorState}
                handleKeyCommand={handleKeyCommand}
            />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-t border-base-content/10 pt-2">

                {/* Inline */}
                <ToolbarButton onClick={() => toggleInline('BOLD')} icon={<BiBold />} />
                <ToolbarButton onClick={() => toggleInline('ITALIC')} icon={<BiItalic />} />
                <ToolbarButton onClick={() => toggleInline('UNDERLINE')} icon={<BiUnderline />} />
                <ToolbarButton onClick={() => toggleInline('STRIKETHROUGH')} icon={<BiStrikethrough />} />
                <ToolbarButton onClick={() => toggleInline('CODE')} icon={<BiCode />} />

                <Divider />

                {/* Blocks */}
                <ToolbarButton onClick={() => toggleBlock('header-one')} icon={<BiHeading />} />
                <ToolbarButton onClick={() => toggleBlock('blockquote')} icon={<BiSolidQuoteAltLeft />} />
                <ToolbarButton onClick={() => toggleBlock('unordered-list-item')} icon={<BiListUl />} />
                <ToolbarButton onClick={() => toggleBlock('ordered-list-item')} icon={<BiListOl />} />
                <ToolbarButton onClick={() => toggleBlock('code-block')} icon={<BiCodeBlock />} />
            </div>
        </div>
    );
};

/* Toolbar button */
const ToolbarButton = ({
    onClick,
    icon
}: {
    onClick: () => void;
    icon: React.ReactNode;
}) => (
    <button
        type="button"
        onMouseDown={e => {
            e.preventDefault(); // 👈 evita perder foco
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

Text.craft = {
    displayName: 'Text',
    props: {
        text: 'Editable text',
    },
};
