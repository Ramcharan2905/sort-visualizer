document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.querySelector('.array')
    const randomizeButton = document.querySelector('.random')
    const sortButton = document.querySelector('.do-sort')
    const sortSelect = document.querySelector('#sort')

    // Function to create and display the array
    function createArray() {
        arrayContainer.innerHTML = ''
        const array = []
        for (let i = 1; i <= 100; i++) {
            array.push(i)
        }
        array.sort(() => Math.random() - 0.5) // Randomize the array

        array.forEach(value => {
            const bar = document.createElement('div')
            bar.classList.add('bar')
            bar.style.height = `${value}px`
            bar.style.width = '10px'
            bar.style.margin = '0 1px'
            bar.dataset.value = value
            arrayContainer.appendChild(bar)
        })
    }

    // Initialize the array on page load
    createArray()

    randomizeButton.addEventListener('click', createArray)

    function swapBars(bar1, bar2) {
        const tempHeight = bar1.style.height
        bar1.style.height = bar2.style.height
        bar2.style.height = tempHeight
    }

    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

    async function bubbleSort(array, bars) {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    // Swap values in the array
                    ;[array[j], array[j + 1]] = [array[j + 1], array[j]]

                    // Swap the bars
                    swapBars(bars[j], bars[j + 1])

                    // Visual delay
                    await delay(50)
                }
            }
        }
    }

    // Selection Sort with visualization
    async function selectionSort(array, bars) {
        for (let i = 0; i < array.length; i++) {
            let minIndex = i
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j
                }
            }

            if (minIndex !== i) {
                // Swap values in the array
                ;[array[i], array[minIndex]] = [array[minIndex], array[i]]

                // Swap the bars
                swapBars(bars[i], bars[minIndex])

                // Visual delay
                await delay(50)
            }
        }
    }

    // Insertion Sort with visualization
    async function insertionSort(array, bars) {
        for (let i = 1; i < array.length; i++) {
            let key = array[i]
            let j = i - 1
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j]
                swapBars(bars[j], bars[j + 1])
                await delay(50)
                j = j - 1
            }
            array[j + 1] = key
        }
    }

    // Merge Sort with visualization
    async function mergeSort(array, bars, start = 0, end = array.length - 1) {
        if (start < end) {
            const mid = Math.floor((start + end) / 2)
            await mergeSort(array, bars, start, mid)
            await mergeSort(array, bars, mid + 1, end)
            await merge(array, bars, start, mid, end)
        }
    }

    async function merge(array, bars, start, mid, end) {
        let left = array.slice(start, mid + 1)
        let right = array.slice(mid + 1, end + 1)
        let k = start
        let i = 0,
            j = 0

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                array[k] = left[i]
                bars[k].style.height = `${left[i]}px`
                i++
            } else {
                array[k] = right[j]
                bars[k].style.height = `${right[j]}px`
                j++
            }
            k++
            await delay(50)
        }

        while (i < left.length) {
            array[k] = left[i]
            bars[k].style.height = `${left[i]}px`
            i++
            k++
            await delay(50)
        }

        while (j < right.length) {
            array[k] = right[j]
            bars[k].style.height = `${right[j]}px`
            j++
            k++
            await delay(50)
        }
    }

    // Quick Sort with visualization
    async function quickSort(array, bars, low = 0, high = array.length - 1) {
        if (low < high) {
            const pi = await partition(array, bars, low, high)
            await quickSort(array, bars, low, pi - 1)
            await quickSort(array, bars, pi + 1, high)
        }
    }

    async function partition(array, bars, low, high) {
        const pivot = array[high]
        let i = low - 1

        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++
                [array[i], array[j]] = [array[j], array[i]]
                swapBars(bars[i], bars[j])
                await delay(50)
            }
        }
        ;[array[i + 1], array[high]] = [array[high], array[i + 1]]
        swapBars(bars[i + 1], bars[high])
        await delay(50)
        return i + 1
    }

    sortButton.addEventListener('click', () => {
        const selectedSort = sortSelect.value
        const bars = document.querySelectorAll('.bar')
        const array = Array.from(bars).map(bar => parseInt(bar.dataset.value))

        switch (selectedSort) {
            case 'Bubble':
                bubbleSort(array, bars)
                break
            case 'Selection':
                selectionSort(array, bars)
                break
            case 'Insertion':
                insertionSort(array, bars)
                break
            case 'Merge':
                mergeSort(array, bars)
                break
            case 'Quick':
                quickSort(array, bars)
                break
            default:
                break
        }
    })
})
