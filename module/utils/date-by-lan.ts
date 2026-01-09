export function dateByLan(date: Date, lan: 'en' | 'es' | 'jp') {
    const intlByLan = {
        'en': 'en-US',
        'es': 'es-CO',
        'jp': 'ja-JP'
    }
    return date.toLocaleDateString(intlByLan[lan], { weekday: "long", day: "numeric", month: "long" })
}


export function dateByLanWithTime(date: Date, lan: 'en' | 'es' | 'jp') {
    const intlByLan = {
        'en': 'en-US',
        'es': 'es-CO',
        'jp': 'ja-JP'
    }
    return date.toLocaleDateString(intlByLan[lan], { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "numeric", second: "numeric" })
}