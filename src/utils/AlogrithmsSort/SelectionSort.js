/**
 * OK -- 07/10/2022
 */
import { sleep } from "../tools";

export default async function (length, arrays, colors, fast) {
    let lowkey;
    let lowindex;

    for (let i = 0; i < length - 1; i++) {
        lowkey = arrays[i].data;
        lowindex = i;

        // đánh dấu phần tử lowkey đầu tiên
        arrays[i].color = colors.lowkey;
        arrays[i].isSelected = true;

        for (let j = i + 1; j < length; j++) {
            // hiệu ứng duyệt qua phần tử
            arrays[j].color = colors.selected;
            await sleep(fast*2);
            arrays[j].color = colors.orginal;

            if (arrays[j].data < lowkey) {

                // gán lại màu cho phần tử nhỏ nhất đã trọn trước đó
                arrays[lowindex].color = colors.orginal;
                arrays[lowindex].isSelected = false;
                await sleep(fast);

                lowkey = arrays[j].data;
                lowindex = j;

                // gán lại màu cho phần tử đã được chọn
                arrays[lowindex].color = colors.lowkey;
                arrays[lowindex].isSelected = true;
                await sleep(fast);
            }
        }

        // tạo hiệu ứng chuyển đổi
        arrays[i].color = colors.lowkey;
        let findspeed = ( arrays[lowindex].x - arrays[i].x ) / 40;

        for (let speed = 0; speed < findspeed * 8; speed++) {
            arrays[lowindex].x -= 5;
            arrays[i].x += 5;
            await sleep(fast/10);
        }

        // swap
        let temp = arrays[lowindex].data;
        arrays[lowindex].data = arrays[i].data;
        arrays[i].data = temp;

        // xóa đánh dấu
        arrays[lowindex].isSelected = false;

        // trả lại vị trí ban đầu cho các phần tử
        arrays[lowindex].x += 40 * findspeed;
        arrays[i].x -= 40 * findspeed;

        // tô lại màu
        arrays[lowindex].color = colors.orginal;
        arrays[i].color = colors.sorted;
    }
    arrays[length - 1].color = colors.sorted;
}