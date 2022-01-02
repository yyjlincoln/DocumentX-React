interface ThemedProps {
    type?: string,
    children?: React.ReactNode,
    className?: string,
    responsive?: string,
    style?: React.CSSProperties
}

interface ElementStyle {
    [key: string]: [string, React.CSSProperties?]
}

const TextStyles: ElementStyle = {
    "main": ["font-bold"],
    "primary": ["", {
        color: "#1E6091"
    }],
    "secondary": ["", {
        color: "#1A759F"
    }],
    "normal": [""],
    "default": [""],
    "nav": ["font-semibold"],
    "black": ["text-black"],
    "gray": ["text-gray-700"],
    "button-text": ["font-semibold text-white"]
}

const Responsive: ElementStyle = {
    "text-lg": ["text-xs sm:text-sm md:text-md lg:text-lg"],
    "text-xl": ["text-sm sm:text-md md:text-lg lg:text-xl"],
    "text-2xl": ["text-md sm:text-lg md:text-xl lg:text-2xl"],
    "text-3xl": ["text-lg sm:text-xl md:text-2xl lg:text-3xl"],
    "text-4xl": ["text-xl sm:text-2xl md:text-3xl lg:text-4xl"],
    "mt-1": ["md:mt-1"],
    "mt-2": ["mt-1 md:mt-2"],
    "mt-4": ["mt-2 md:mt-4"],
    "mt-8": ["mt-4 md:mt-8"],
}

const GlobalStyled: ElementStyle = {
    "bg-gradient": ["", {
        background: "linear-gradient(#168aad, #76c893)"
    }],
    "bg-gradient-light": ["", {
        background: "linear-gradient(#C3EBF7, #E1F3E8)"
    }],
    "theme-1": ["", {
        background: "#168AAD"
    }]
}

export function Text({ type, children, className, responsive, style, ...args }: ThemedProps) {
    return CompileClassess(TextStyles, type, children, className, responsive, style, args)
}

export function Styled({ type, children, className, responsive, style, ...args }: ThemedProps) {
    return CompileClassess(GlobalStyled, type, children, className, responsive, style, args)
}

export function Button({ themeClass = "theme-1", children, ...args }: { themeClass?: string, children?: React.ReactNode, onClick?: () => void }) {
    return (
        <Styled className="flex flex-row justify-center" responsive="mt-8">
            <Styled type={themeClass} className="rounded-lg px-4 py-4 flex flex-row select-none cursor-pointer" {...args}>
                <Text type="button-text" responsive="text-xl">{children}</Text>
            </Styled>
        </Styled>
    )
}


function GetResponsiveClassess(type?: string): { classNames: string, styles: React.CSSProperties } {
    if (type && Responsive[type]) {
        return {
            classNames: Responsive[type][0],
            styles: Responsive[type][1] ?? {}
        }
    } else {
        return {
            classNames: type ?? "",
            styles: {}
        }
    }
}

function CompileClassess(from: ElementStyle, type?: string, children?: React.ReactNode, className?: string, responsive?: string, style?: React.CSSProperties, args?: { [key: string]: any }) {
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

    if (!responsive) {
        responsive = "default"
    }
    const responsiveSplit = responsive?.split(" ")
    responsiveSplit.forEach((type) => {
        const { classNames, styles } = GetResponsiveClassess(type)
        classes += ` ${classNames}`
        css = {
            ...styles,
            ...css
        }
    })


    classes += ` ${className ?? ""}`
    css = { ...css, ...style }

    return (
        <div className={classes} style={css} {...args}>
            {children}
        </div>
    )
}