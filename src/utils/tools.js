// hàm shuffed giúp tạo một mảng chứa các phần tử số ngẫu nhiên
export const shuffed = (list) => list.sort(() => Math.random() - 0.5);

// Hàm sleep hỗ trợ hiển thị thay đổi của các phần tử trong mảng
export const sleep = (ms) => new Promise(res => setTimeout(res, ms));