import { sleep } from "../tools";

async function heapify(arrays, n, i, colors) {
    let largest = i; // khởi tạo root   
    let l = 2 * i + 1; // khởi tạo con trái
    let r = 2 * i + 2; // khởi tạo con phải

    // đánh dấu là phần tử root
    arrays[i].isSelected = true;

    // đánh dấu các phần tử largest, left, right
    arrays[largest].color = colors.largest;
    if (l < n) arrays[l].color = colors.left;
    if (r < n) arrays[r].color = colors.right;

    // nếu con trái lớn hơn phần tử root
    if (l < n && arrays[l].data > arrays[largest].data) {
        largest = l;
    }

    // nếu con phải lớn hơn phần tử root
    if (r < n && arrays[r].data > arrays[largest].data) {
        largest = r;
    }

    // nếu largest không phải là root
    if (largest != i) {

        // tạo hiệu ứng chuyển đổi
        let findspeed = largest - i;
        for (let speed = 0; speed < findspeed * 8; speed ++) {
            arrays[i].x += 5;
            arrays[largest].x -= 5;
            await sleep(20);
        }

        let temp = arrays[i].data;
        arrays[i].data = arrays[largest].data;
        arrays[largest].data = temp;

        // hoàn hiệu ứng
        arrays[largest].x += 40 * findspeed;
        arrays[i].x -= 40 * findspeed;

        // hủy đánh dấu là phần tử root
        arrays[i].isSelected = false;

        // tô lại màu
        arrays[i].color = colors.orginal;
        arrays[largest].color = colors.orginal;
        if (l < n) arrays[l].color = colors.orginal;
        if (r < n) arrays[r].color = colors.orginal;

        await heapify(arrays, n, largest, colors);
    }

    // hủy đánh dấu là phần tử root
    arrays[i].isSelected = false;
    
    // tô lại màu
    arrays[i].color = colors.orginal;
    arrays[largest].color = colors.orginal;
    if (l < n) arrays[l].color = colors.orginal;
    if (r < n) arrays[r].color = colors.orginal;
}

async function heapsort(arrays, n, colors) {
    // build heap
    for (let i = parseInt(n / 2 - 1); i >= 0; i--) {
        await heapify(arrays, n, i, colors);
    }

    for (let i = n - 1; i > 0; i--) {
        // đánh dấu 2 phần tử đầu và cuối
        arrays[i].color = colors.right;
        arrays[0].color = colors.left;
        await sleep(200);
        // tạo hiệu ứng đổi giữa 2 phần tử đầu và cuối
        for (let speed = 0; speed < i * 8; speed++) {
            arrays[0].x += 5;
            arrays[i].x -= 5;
            await sleep(20);
        }

        // đổi phần tử đầu và phần tử cuối
        let temp = arrays[0].data;
        arrays[0].data = arrays[i].data;
        arrays[i].data = temp;

        // hoàn hồi hiệu ứng
        arrays[0].x -= 40 * i;
        arrays[i].x += 40 * i;

        await sleep(100);

        // xóa đánh dấu
        // đánh dấu đã sắp xếp
        arrays[i].color = colors.sorted;

        await heapify(arrays, i, 0, colors);
    }
    arrays[0].color = colors.sorted;
}

export default async function (length, arrays, colors) {
    heapsort(arrays, length, colors);
}