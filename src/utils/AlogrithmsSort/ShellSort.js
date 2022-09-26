import { sleep } from "../tools.js";

export default async function (lenght, arrays, colors) {
    // interval biến này dùng để chia các mảng con

    let interval;
    let i;
    let j;
    for (interval = parseInt(lenght/2); interval > 0; interval = parseInt(interval / 2)) {
        for (i = interval; i < lenght; i++) {
            // đánh dấu phần tử được chọn
            arrays[i].color = colors.selected;
            arrays[i - interval].color = colors.selected;

            // animation
            for(let speed = 0; speed < interval * 8; speed++) {
                arrays[i].x -= 5;
                arrays[i - interval].x += 5;
                await sleep(30);
            }

            let temp = arrays[i].data;
            for (j = i; j >= interval && arrays[j - interval].data > temp; j -= interval) {
                arrays[j].data = arrays[j - interval].data;
            }
            arrays[j].data = temp;
            
            // trả lại vị trí
            arrays[i].x += 5 * 8 * interval;
            arrays[i - interval].x -= 5 * 8 * interval;

            // trả về màu gốc
            arrays[i].color = colors.orginal;
            arrays[i-interval].color = colors.orginal;
        }
    }
}