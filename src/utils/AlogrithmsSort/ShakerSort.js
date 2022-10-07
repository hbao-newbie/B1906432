/**
 * OK -- 07/10/2022
 */
import {sleep} from "../tools.js";

export default async function (lenght, arrays, colors, fast) {
    let left = 0;
    let right = lenght - 1;
    let k = 0;
    while (left < right) {
        for (let i = left; i < right; i++) {
            // tô màu đánh dấu
            arrays[i].color = colors.selected;
            arrays[i + 1].color = colors.selected;

            if (arrays[i].data > arrays[i + 1].data) {
                // tạo hiệu ứng animation
                for (let speed = 0; speed < 8; speed++) {
                    arrays[i].x += 5;
                    arrays[i + 1].x -= 5;
                    await sleep(fast/2);
                }

                let temp = arrays[i].data;
                arrays[i].data = arrays[i + 1].data;
                arrays[i + 1].data = temp;
                k = i;

                // hoàn vị trí
                arrays[i].x -= 40;
                arrays[i + 1].x += 40;
            }
            arrays[i].color = colors.orginal;
            arrays[i + 1].color = colors.orginal;
        }
        right = k;
        for (let i = right; i > left; i--) {
            if (arrays[i].data < arrays[i - 1].data) {
                // tô màu đánh dấu
                arrays[i].color = colors.selected;
                arrays[i - 1].color = colors.selected;

                // tạo hiệu ứng animation
                for (let speed = 0; speed < 8; speed++) {
                    arrays[i].x -= 5;
                    arrays[i - 1].x += 5;
                    await sleep(fast/2);
                }

                let temp = arrays[i].data;
                arrays[i].data = arrays[i - 1].data;
                arrays[i - 1].data = temp;
                k = i;

                // hoàn trả vị trí
                arrays[i].x += 40;
                arrays[i - 1].x -= 40;
            }
            arrays[i].color = colors.orginal;
            arrays[i - 1].color = colors.orginal;
        }
        left = k;
    }
}