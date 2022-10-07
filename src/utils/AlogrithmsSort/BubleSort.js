/**
 * OK -- 07/10/2022
 */
import { sleep } from "../tools.js";

export default async function (length, arrays, colors, fast) {
    for (let i = 0; i <= length - 2; i++) {
        for (let j = length - 1; j >= i + 1; j--) {
            // đánh dấu 2 phần tử
            arrays[j].color = colors.selected;
            arrays[j-1].color = colors.selected;
            await sleep(fast);

            if (arrays[j].data < arrays[j-1].data) {

                // tạo hiệu ứng stransform
                for(let speed = 0; speed < 8; speed++) {
                    arrays[j].x -= 5;
                    arrays[j-1].x += 5;
                    await sleep(fast/2);
                }

                // swap
                let temp = arrays[j].data;
                arrays[j].data = arrays[j-1].data;
                arrays[j-1].data = temp;

                // trả lại vị trí ban đầu cho các phần tử
                arrays[j].x += 40;
                arrays[j-1].x -= 40;
            }

            // tạo hiệu ứng duyệt qua phần tử
            arrays[j].color = colors.orginal;
            await sleep(fast);
        }
        // đánh dấu phần tử đã được sắp xếp
        arrays[i].color = colors.sorted;
    }
    // đánh dấu phần tử cuối cùng được sắp xếp
    arrays[length - 1].color = colors.sorted;
}