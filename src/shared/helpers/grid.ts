export const createCanvaGrid = (spacing: number, cols: number) => {
    const grid = [];
    for (let i = 1; i < cols + 1; i++) {
        grid.push(spacing * i);
    }
    return grid;
}