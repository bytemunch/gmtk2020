let conversionRatio = 32;

export const pxToB2d = (x,y?) => {
    return [x / conversionRatio, -y / conversionRatio];
}

export const b2dToPx = (x,y?) => {
    return [x * conversionRatio, -y * conversionRatio];
}