/**
 * OK -- 07/10/2022
 */
import {sleep} from "../tools.js";

export default async function (lenght, arrays, colors, fast) {
    let left = 0;
    let right = lenght - 1;
    let k = 0;
    while (left < right) {
        let i;
        for (i = left; i < right; i++) {
            // tô màu đánh dấu
            arrays[i].color = colors.right;
            arrays[i + 1].color = colors.right;

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
        let j;
        for (j = right; j > left; j--) {
            if (arrays[j].data < arrays[j - 1].data) {
                // tô màu đánh dấu
                arrays[j].color = colors.left;
                arrays[j - 1].color = colors.left;

                // tạo hiệu ứng animation
                for (let speed = 0; speed < 8; speed++) {
                    arrays[j].x -= 5;
                    arrays[j - 1].x += 5;
                    await sleep(fast/2);
                }

                let temp = arrays[j].data;
                arrays[j].data = arrays[j - 1].data;
                arrays[j - 1].data = temp;
                k = j;

                // hoàn trả vị trí
                arrays[j].x += 40;
                arrays[j - 1].x -= 40;
            }
            arrays[j].color = colors.orginal;
            arrays[j - 1].color = colors.orginal;
        }
        left = k;
    }
}