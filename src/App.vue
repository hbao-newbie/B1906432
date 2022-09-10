<template>
    <div class="body-container">
        <div class="nav">
            <div class="input-group">
                <span class="input-group-text">Nhập số phần tử</span>
                <input class="from-control" type="text" v-model="length">
            </div>
            <div class="input-group">
                <button class="btn" @click="random()">Random</button>
                <button class="btn" @click="start()">Start</button>
                <button class="btn" @click="clear()">Clear</button>
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
                <select class="input-group-select">
                    <option 
                        v-for="(fast, index) in listFastSort" :key="index"
                        :value="fast"
                    >
                        {{fast}}x
                    </option>
                </select>
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
    import HeapSort from "./utils/AlogrithmsSort/HeapSort.js"
    export default {
        data() {
            return {
                // các option trước khi chạy thuật toán
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
                    }
                ],
                selectAlgorithm: 1,
                listFastSort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                length: 15,
                arrayElements: [],
                isSorted: true,
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
                arraysLeft: [], // hỗ trợ cho thuật toán merge sort
                arraysRight: [], // hỗ trợ cho thuật toán merge sort
            }
        },
        methods: {
            random() {
                if ( this.length <= 20 ) {
                    // tạo một mảng temp
                    const temp = [];
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
            async start() {
                // nếu hàm random chưa kích hoạt trước đó thì nó sẽ được gọi lại trong hàm start
                if (this.arrayElements.length === 0) {
                    this.random();
                }

                let selectedAlgorithm = parseInt(this.selectAlgorithm);

                switch (selectedAlgorithm) {
                    case 1:
                        BubleSort(this.length, this.arrayElements, this.colors);
                        break;
                    case 2:
                        InsertionSort(this.length, this.arrayElements, this.colors);
                        break;
                    case 3:
                        SelectionSort(this.length, this.arrayElements, this.colors);
                        break;
                    case 4:
                        QuickSort(this.length, this.arrayElements, this.colors);
                        break;
                    case 5:
                        MergeSort(this.length, this.arrayElements, this.colors);
                        break;
                    case 6:
                        HeapSort(this.length, this.arrayElements, this.colors);
                        break;
                    default:
                        BubleSort(this.length, this.arrayElements, this.colors);
                    break;
                }
            },
            clear() {
                this.arrayElements = [];
            }
        },
    }
</script>