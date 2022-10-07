<template>
    <div class="body-container">
        <div class="nav">
            <div class="input-group">
                <span class="input-group-text">Nhập số phần tử</span>
                <input class="from-control" type="text" v-model="length">
            </div>
            <div class="input-group">
                <button class="btn" @click="random()">Random</button>
            </div>
            <div class="input-group">
                <select class="input-group-select"
                    v-model="selectAlgorithm"
                >
                    <option
                        v-for="(algorithm, index) in listAlgorithmSort" :key="index"
                        :value="algorithm.id"
                    >
                        {{algorithm.name}}
                    </option>
                </select>
            </div>
            <div class="input-group">
                <select class="input-group-select"
                    v-model="speed"
                >
                    <option 
                        v-for="(fast, index) in listFastSort" :key="index"
                        :value="fast"
                    >
                        {{fast}}x
                    </option>
                </select>
            </div>
            <div class="input-group">
                <span class="input-group-text">Nhập các phần tử</span>
                <input class="from-control from-text" type="text" v-model="stringElement">
            </div>
            <div class="input-group">
                <button class="btn" @click="create()">Create</button>
            </div>
            <div class="input-group">
                <button class="btn" @click="start()">Start</button>
                <button class="btn" @click="clear()">Clear</button>
            </div>
        </div>
        <div class="main-one">
            <div
                class="element"
                v-for="(element, index) in arrayElements" :key="index"
                :style="{
                    transform: `translate(${element.x}px, ${element.y}px)`,
                }"
            >
                <div
                    class="element-item"
                    :style="{
                        height: `${element.data * 10}px`,
                        backgroundColor: `${element.color}`
                    }"
                >
                </div>
                <div class="element-item-number">{{ element.data }}</div>
                <div class="element-item-status">
                    <div class="selected" v-if="element.isSelected"></div>
                    <div class="pivot" v-if="element.isPivot"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import tools
    import { shuffed } from "./utils/tools.js";
    // import các thuật toán sắp xếp
    import BubleSort from "./utils/AlogrithmsSort/BubleSort.js";
    import SelectionSort from "./utils/AlogrithmsSort/SelectionSort.js";
    import InsertionSort from "./utils/AlogrithmsSort/InsertionSort.js";
    import QuickSort from "./utils/AlogrithmsSort/QuickSort.js";
    import MergeSort from "./utils/AlogrithmsSort/MergeSort.js";
    import HeapSort from "./utils/AlogrithmsSort/HeapSort.js";
    import ShakerSort from "./utils/AlogrithmsSort/ShakerSort.js";
    export default {
        data() {
            return {
                // danh sách các thuật toán
                listAlgorithmSort: [
                    {
                        id: 1,
                        name: "Bubble sort"
                    },
                    {
                        id: 2,
                        name: "Insertion sort"
                    },
                    {
                        id: 3,
                        name: "Selection sort"
                    },
                    {
                        id: 4,
                        name: "Quick sort"
                    },
                    {
                        id: 5,
                        name: "Merge sort"
                    },
                    {
                        id: 6,
                        name: "Heap sort"
                    },
                    {
                        id: 7,
                        name: "Shaker sort"
                    }
                ],
                // mặc định chọn thuật toán buble sort
                selectAlgorithm: 1,
                // độ dài mặc định để random mảng
                length: 15,
                // mảng của các phần tử chứa các object
                arrayElements: [],
                // đánh dấu mảng đã sắp xếp hay chưa => biến này chưa được sủ dụng
                isSorted: false,
                // bảng màu dùng trong việc đánh dấu các phần tử
                colors: {
                    orginal: '#0dcaf0',
                    selected: '#198754',
                    runing: '#d63384',
                    sorted: '#ffc107',
                    lowkey: '#dc3545',
                    pivot: '#6610f2',
                    left: '#198754',
                    right: '#fd7e14',
                    tick: '#13385c',
                    largest: '#6c757d',
                },
                // nhận vào một các phần tử chỉ là số để tạo mảng
                stringElement: '',
                // tốc độ chạy các thuật toán
                listFastSort: [1, 2, 3, 4, 5],
                // tốc độ chạy mặc định của thuật toán
                fast: 100,
                speed: 2,
            }
        },
        methods: {
            random() {
                this.isSorted = false;
                // chỉ cho phép tạo tối đa 20 phần tử
                if ( this.length <= 20 ) {
                    // tạo một mảng temp
                    const temp = [];
                    // mảng temp này chứa các phần tử i từ 1 -> this.lenght
                    for (let i = 1; i <= this.length; i++) {
                        temp.push({
                            // height: i*10,
                            data: i,
                            color: this.colors.orginal,
                            isSelected: false, // dùng thuật selection sort
                            isPivot: false, // dùng cho thuật quick sort   
                        });
                    }

                    // trộn ngẫu nhiên mảng temp để thêm vào mảng elements
                    this.arrayElements = shuffed(shuffed(shuffed(shuffed(temp))));
                    
                    // thêm x y vào để tạo transform
                    let x = 0;
                    for(let i = 0; i < this.length; i++) {
                        x += 40;
                        this.arrayElements[i].x = x;
                        this.arrayElements[i].y = 0;
                    }

                } else {
                    alert("Giới hạn chỉ có 20 phần tử");
                }
            },
            create() {
                this.isSorted = false;
                if (this.stringElement === '') {
                    alert("Bạn chưa nhập gì!!!");
                } else {
                    this.length = 0;
                    this.arrayElements = [];
                    // tách chuỗi bởi các dấu phân cách
                    let ArrayNumbers = [];
                    for (let i = 0; i < this.stringElement.split(/[,;]/).length; i++) {
                        // kiểm tra xem nó có phải là số hay không
                        if (
                            parseInt(this.stringElement.split(/[,;]/)[i]) 
                            && parseInt(this.stringElement.split(/[,;]/)[i]) <= 20
                            && parseInt(this.stringElement.split(/[,;]/)[i]) >= 1
                        ) {
                            ArrayNumbers.push(parseInt(this.stringElement.split(/[,;]/)[i]));
                        } else {
                            // hiển thị thông báo cho người dùng nhập sai
                            alert("Các phần tử phải là số và cách nhau bởi ',' hoặc ';' và giới hạn từ 1 đến 20");
                            ArrayNumbers = [];
                            break;
                        }
                    }

                    // tạo mảng các phần tử
                    for (let i = 0; i < ArrayNumbers.length; i++) {
                        if (ArrayNumbers[i]) {
                            this.arrayElements.push({
                                data: ArrayNumbers[i],
                                color: this.colors.orginal,
                                isSelected: false, // dùng thuật selection sort
                                isPivot: false, // dùng cho thuật quick sort   
                            });
                        }
                    }

                    // thêm x y vào để tạo transform
                    let x = 0;
                    for(let i = 0; i < this.arrayElements.length; i++) {
                        x += 40;
                        this.arrayElements[i].x = x;
                        this.arrayElements[i].y = 0;
                    }
                    this.length = this.arrayElements.length;
                }  
            },
            async start() {
                // nếu hàm random chưa kích hoạt trước đó thì nó sẽ được gọi lại trong hàm start
                if (this.arrayElements.length === 0) {
                    alert("Bạn chưa tạo mảng!!!");
                }

                if (this.isSorted) {
                    // Nếu mảng đã được sắp xếp nó sẽ random lại
                    this.random();
                    this.isSorted = false;
                } else {
                    let selectedAlgorithm = parseInt(this.selectAlgorithm);
                    let speed = parseInt(this.speed);

                    switch (selectedAlgorithm) {
                        case 1:
                            BubleSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                            break;
                        case 2:
                            InsertionSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                            break;
                        case 3:
                            SelectionSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                            break;
                        case 4:
                            QuickSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                            break;
                        case 5:
                            MergeSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                            break;
                        case 6:
                            HeapSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                            break;
                        case 7:
                            ShakerSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                            break;
                        default:
                            BubleSort(this.length, this.arrayElements, this.colors, this.fast/speed);
                            this.isSorted = true;
                        break;
                    }
                }

                
            },
            clear() {
                this.arrayElements = [];
                this.stringElement = '';
            }
        },
    }
</script>