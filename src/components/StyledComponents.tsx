interface TextProps {
    type?: string,
    children?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}

interface ElementStyle {
    [key: string]: [string, React.CSSProperties?]
}

const TextStyles: ElementStyle = {
    "main": ["text-2xl font-bold"],
    "primary": ["", {
        color: "#1E6091"
    }],
    "secondary": ["", {
        color: "#1A759F"
    }],
    "title": ["text-4xl font-bold"],
    "normal": [""],
    "default": [""],
    "nav":["font-bold text-lg"],
    "black": ["text-black"],
    "gray": ["text-gray-800"],
}

export function Text({ type, children, className, style }: TextProps) {
    return CompileClassess(TextStyles, type, children, className, style)
}

function CompileClassess(from: ElementStyle, type?: string, children?: React.ReactNode, className?: string, style?: React.CSSProperties) {
    var classes = ""
    var css = {}

    if (!type) {
        type = "default"
    }

    const typeSplit = type.split(" ")

    typeSplit.forEach((type) => {
        classes += ` ${(from[type] ?? [])[0]}`
        css = {
            ...css,
            ...((from[type] ?? [])[1] ?? {})
        }
    })
    classes += ` ${className ?? ""}`
    css = { ...css, ...style }

    return (
        <div className={classes} style={css}>
            {children}
        </div>
    )
}