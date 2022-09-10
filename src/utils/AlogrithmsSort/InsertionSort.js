import { sleep } from "../tools.js";

export default async function (length, arrays, colors) {
    let translateY = 30;
    if (length <= 10) translateY /= 2;
    for (let i = 0; i < length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            // tạo hiệu ứng duyệt
            arrays[j].color = colors.lowkey;
            await sleep(200);

            if (arrays[j].data < arrays[j-1].data) {
                // tô màu thằng lớn hơn
                arrays[j-1].color = colors.selected;
                await sleep(50);
                
                // tạo hiệu ứng di chuyển xuống
                for (let y = 0; y < 10; y++) {
                    arrays[j].y += translateY;
                    await sleep(40);
                }

                // tạo hiệu ứng đổi vị trí
                for(let speed = 0; speed < 8; speed++) {
                    arrays[j].x -= 5;
                    arrays[j-1].x += 5;
                    await sleep(40);
                }

                // di chuyển lên
                for (let y = 0; y < 10; y++) {
                    arrays[j].y -= translateY;
                    await sleep(40);
                }

                let temp = arrays[j].data;
                arrays[j].data = arrays[j-1].data;
                arrays[j-1].data = temp;

                // hoàn hiệu ứng
                arrays[j].x += 40;
                arrays[j-1].x -= 40;
            }
            arrays[j].color = colors.sorted;
            arrays[j-1].color = colors.sorted;
            await sleep(100);
        }
    }
}