import { sleep } from "../tools";

async function findpivot(arrays, i, j) {
    let firstkey = arrays[i].data;
    let k = i + 1;
    while ((k <= j) && (arrays[k].data === firstkey)) {
        k++;
    }
    if (k > j) {
        return -1;
    } else if (arrays[k].data > firstkey) {
        return k;
    } else {
        return i;
    }
}

async function partition(arrays, i, j, pivot, colors) {
    let L = i;
    let R = j;
    while (L < R) {
        while (arrays[L].data < pivot) {
            L++;
            // tô màu cho phần tử con trái
            arrays[L].color = colors.left;
            await sleep(200);
        }
        while (arrays[R].data >= pivot) {
            R--;
            // tô màu cho phần tử con phải
            arrays[R].color = colors.right;
            await sleep(200);
        }
        if (L < R) {
            // đánh dấu phần tử lớn hơn pivot
            arrays[L].color = colors.tick;

            // đánh dấu phần tử nhỏ hơn pivot
            arrays[R].color = colors.tick;

            // tạo hiệu ứng chuyển đổi
            let findspeed = R - L;
            for (let speed = 0; speed < findspeed * 4; speed++) {
                arrays[L].x += 10;
                arrays[R].x -= 10;
                await sleep(50);
            }

            // hủy hiệu ứng màu
            for (let x = i; x <= L; x++) {
                arrays[x].color = colors.orginal;
            }
            for (let y = j; y >= R; y--) {
                arrays[y].color = colors.orginal;
            }

            let temp = arrays[L].data;
            arrays[L].data = arrays[R].data;
            arrays[R].data = temp;

            // hủy hiệu ứng
            arrays[L].x -= 40 * findspeed;
            arrays[R].x += 40 * findspeed;
        }
        // hủy hiệu ứng màu
        for (let x = i; x < L; x++) {
            arrays[x].color = colors.orginal;
        }
        for (let y = j; y > R; y--) {
            arrays[y].color = colors.orginal;
        }
    }
    return L;
}

async function quicksort(arrays, i, j, colors) {
    let pivot;
    let k;
    let pivotidx = await findpivot(arrays, i, j);
    if (pivotidx != -1) {
        pivot = arrays[pivotidx].data;
        // đánh dấu phần tử pivot
        arrays[pivotidx].color = colors.pivot;
        arrays[pivotidx].isPivot = true;

        k = await partition(arrays, i, j, pivot, colors);

        // hủy đánh dấu
        arrays[pivotidx].color = colors.orginal;
        arrays[pivotidx].isPivot = false;

        await quicksort(arrays, i, k-1, colors);
        await quicksort(arrays, k, j, colors);
    }
}

export default async function (length, arrays, colors) {
    quicksort(arrays, 0, length - 1, colors);
}