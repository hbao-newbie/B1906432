/**
 * OK -- 07/10/2022
 */
import { sleep } from "../tools.js";

export default async function (length, arrays, colors, fast) {
    // tạo giới hạn di chuyển lên xuống của các phần tử
    // let translateY = 20;
    // if (length <= 10) translateY -= 5;

    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            // đánh dấu phần tử
            arrays[j].color = colors.selected;
            await sleep(fast);

            if (arrays[j].data < arrays[j-1].data) {

                // tạo hiệu ứng di chuyển xuống
                // for (let y = 0; y < 10; y++) {
                //     arrays[j].y += translateY;
                //     await sleep(fast/2);
                // }

                // tạo hiệu ứng đổi vị trí
                for(let speed = 0; speed < 8; speed++) {
                    arrays[j].x -= 5;
                    arrays[j-1].x += 5;
                    await sleep(fast/2);
                }

                // di chuyển lên
                // for (let y = 0; y < 10; y++) {
                //     arrays[j].y -= translateY;
                //     await sleep(fast/2);
                // }

                // swap
                let temp = arrays[j].data;
                arrays[j].data = arrays[j-1].data;
                arrays[j-1].data = temp;

                // trả lại vị trí ban đầu cho các phần tử
                arrays[j].x += 40;
                arrays[j-1].x -= 40;
            }
            
            // đánh dấu phần tử đã được sắp xếp
            arrays[j].color = colors.sorted;
            arrays[j-1].color = colors.sorted;
            await sleep(fast);
        }
    }
}