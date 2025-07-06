import type { EmptySlot, Widget } from "./model";

export const calcEmptySlots = (widgets: Widget[], size: { w: number; h: number }, rowWidth: number) => {
	const grid: boolean[][] = [];
	const slots: EmptySlot[] = [];

	let deepestY = 0;

	widgets.forEach((widget) => {
		if (widget.y + widget.h > deepestY) {
			deepestY = widget.y + widget.h - 1;
		}
	});

	for (let y = 0; y <= deepestY; y++) {
		grid.push(new Array(rowWidth).fill(false));
	}

	widgets.forEach((widget) => {
		for (let iY = 0; iY < widget.h; iY++) {
			for (let iX = 0; iX < widget.w; iX++) {
				grid[widget.y + iY][widget.x + iX] = true;
			}
		}
	});

	for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
		for (let cellIndex = 0; cellIndex < grid[rowIndex].length; cellIndex++) {
			if (grid[rowIndex][cellIndex] === false) {
				let subWidth = 1;
				while (subWidth < size.w && grid[rowIndex][cellIndex + subWidth] === false) {
					subWidth++;
				}
				// have space for x
				if (subWidth === size.w) {
					let subX = cellIndex;

					while (subX < cellIndex + subWidth) {
						// check y-depth
						let subHeight = 1;
						while (subHeight < size.h && grid[rowIndex + subHeight - 1][subX] === false) {
							subHeight++;
						}

						if (subHeight !== size.h) {
							break;
						}

						subX++;
					}

					// enough space
					if (subX === cellIndex + size.w) {
						slots.push({ x: cellIndex, y: rowIndex, w: size.w, h: size.h });

						// paint slot
						let subX = cellIndex;
						while (subX < cellIndex + size.w) {
							for (let subY = rowIndex; subY < rowIndex + size.h; subY++) {
								grid[subY][subX] = true;
							}

							subX++;
						}
					}
				}
			}
		}
	}

	const emptyRowIndex = grid.length;

	for (let x = 0; x + size.w <= rowWidth; x = x + size.w) {
		slots.push({ y: emptyRowIndex, x, w: size.w, h: size.h });
	}

	return slots;
};
