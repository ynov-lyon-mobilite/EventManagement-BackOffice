/**
 * To format index for MUI Tab component
 * @param index
 */
export function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export function isValueString(value){
    return (typeof value === 'string' || value instanceof String)
}