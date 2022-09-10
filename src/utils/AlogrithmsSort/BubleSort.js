import { sleep } from "../tools.js";

export default async function (length, arrays, colors) {
    // arrays nhận vào là một mảng các object
    // object: {height, data, x, y}
    for (let i = 0; i <= length - 2; i++ ) {
        for (let j = length - 1; j >= i + 1; j--) {
            arrays[j].color = colors.selected;
            arrays[j-1].color = colors.selected;
            await sleep(100);

            if (arrays[j].data < arrays[j-1].data) {
                // tạo hiệu ứng chuyển đổi
                for(let speed = 0; speed < 8; speed++) {
                    arrays[j].x -= 5;
                    arrays[j-1].x += 5;
                    await sleep(50);
                }

                let temp = arrays[j].data;
                arrays[j].data = arrays[j-1].data;
                arrays[j-1].data = temp;

                // Hoàn hiệu ứng
                arrays[j].x += 40;
                arrays[j-1].x -= 40;
            }
            arrays[j].color = colors.orginal;
            await sleep(100);
        }
        // tô màu element đã sắp xếp
        arrays[i].color = colors.sorted;
    }
    arrays[length - 1].color = colors.sorted;
}