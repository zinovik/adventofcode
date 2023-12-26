const inputTest = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;

const cubes = inputTest
	.split('\n')
	.map((line) => {
		const [start, finish] = line.split('~');
		const [xs, ys, zs] = start.split(',');
		const [xf, yf, zf] = finish.split(',');

		const bricks = [];

		for (let x = Math.min(xs, xf); x <= Math.max(xs, xf); x++) {
			for (let y = Math.min(ys, yf); y <= Math.max(ys, yf); y++) {
				for (let z = Math.min(zs, zf); z <= Math.max(zs, zf); z++) {
					bricks.push([x, y, z]);
				}
			}
		}

		return bricks.sort((bricks1, bricks2) => bricks1[2] - bricks2[2]);
	})
	.sort((bricks1, bricks2) => bricks1[0][2] - bricks2[0][2]);

const map = [];

for (let i = 0; i < cubes.length; i++) {
	for (let j = 0; j < cubes[i].length; j++) {
		const [x, y, z] = cubes[i][j];
		if (!map[x]) map[x] = [];
		if (!map[x][y]) map[x][y] = [];
		map[x][y][z] = true;
	}
}

console.log(map);

for (let i = 0; i < cubes.length; i++) {
	const bricksNumbersToCheck = [];
	const XYs = [];

	for (let j = 0; j < cubes[i].length; j++) {
		if (!XYs.includes(`${cubes[i][j][0]},${cubes[i][j][1]}`)) {
			XYs.push(`${cubes[i][j][0]},${cubes[i][j][1]}`);
			bricksNumbersToCheck.push(j);
		}
	}

	console.log(bricksNumbersToCheck);

	const basicLevel = cubes[i][bricksNumbersToCheck[0]][2];

	let moveDistance = 0;

	for (let k = basicLevel - 1; k > 0; k--) {
		for (let m = 0; m < bricksNumbersToCheck.length; m++) {
			const [x, y, z] = cubes[i][bricksNumbersToCheck[m]];
			if (map[x][y][z]) {
				m = bricksNumbersToCheck.length;
				k = 0;
			}
		}
		if (k !== 0) moveDistance = moveDistance + 1;
	}

	console.log(moveDistance);
}
