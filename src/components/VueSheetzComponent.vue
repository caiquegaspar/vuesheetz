<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  height: {
    type: [String, Number],
    default: '100%'
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  manualColResize: {
    type: [String, Boolean],
    default: true
  },
  manualRowResize: {
    type: [String, Boolean],
    default: true
  },
  colSorting: [String, Boolean],
  colWidths: Array,
  colHeaders: Array,
  colsAlignment: Array,
  colsFormat: Array
})

const filteredData = computed(() => {
  if (sortedCol.value !== null)
    return structuredClone(initialData).sort((a, b) => {
      const sortCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })
      const colNum = sortedCol.value
      const ascendingOrder = sortOrder.value === 'asc'

      const compareFunc = sortCollator.compare(a[colNum], b[colNum])

      return ascendingOrder ? compareFunc : compareFunc * -1
    })

  return initialData
})
const sheetHeight = computed(() => {
  const units = ['px', 'em', 'rem', '%', 'vw', 'vh']
  const { height } = props

  const hasUnit = units.some((val) => height.toString().includes(val))

  return hasUnit ? height : `${height}px`
})
const sheetWidth = computed(() => {
  const units = ['px', 'em', 'rem', '%', 'vw', 'vh']
  const { width } = props

  const hasUnit = units.some((val) => width.toString().includes(val))

  return hasUnit ? width : `${width}px`
})
const columnsWidths = computed(() =>
  props.colWidths
    ? props.colWidths.reduce(
        (acc, obj, idx) => (obj ? (acc += `--column${idx}-width: ${obj}px;`) : acc),
        ''
      )
    : ''
)
const columnsAlignment = computed(() => {
  let styles = ''
  const alignVals = { left: 'start', center: 'center', right: 'end' }

  if (props.colHeaders) styles += '--column-header-align: start;'
  if (props.colsAlignment)
    styles += props.colsAlignment.reduce(
      (acc, obj, idx) => (obj ? (acc += `--column${idx}-x-align: ${alignVals[obj]};`) : acc),
      ''
    )

  return styles
})
const columnsArr = computed(() => (props.colHeaders ? props.colHeaders : alphabetCols))

const initialData = structuredClone(props.data)
const alpha = Array(26)
  .fill(null)
  .map((_, i) => i + 65)
const alphabet = alpha.map((x) => String.fromCharCode(x))
const dataMaxCol = props.data.reduce((acc, { length }) => (acc = length > acc ? length : acc), 0)
const colSize = Math.min(Math.max(dataMaxCol, 26), 702) // max 702 = "ZZ"
const alphabetCols = Array(colSize)
  .fill(null)
  .reduce((acc, _, idx) => {
    const group = Math.floor(idx / alphabet.length)

    const letter = alphabet[idx] ?? alphabet[group - 1] + alphabet[idx - group * alphabet.length]

    return (acc = [...acc, letter])
  }, [])

const rowsArr = ref(Math.max(props.data.length, 100))
const allFocused = ref(false)
const allowResize = ref(false)
const sortedCol = ref(null)
const sortOrder = ref('asc')

const ratingFunc = (stars) =>
  [...Array(5).fill(true), ...Array(5).fill(false)].slice(5 - stars, 10 - stars)

const focusAll = () => {
  const allElements = document.querySelectorAll('.spreadsheet_elem')

  if (allFocused.value) {
    allFocused.value = false
    allElements.forEach((el) => el.classList.remove('selectedLine'))

    return
  }

  allFocused.value = true
  allElements.forEach((el) => el.classList.add('selectedLine'))
}

const focusLine = (className) => (
  blurLines(),
  document.querySelectorAll(className).forEach((el) => el.classList.toggle('selectedLine'))
)

const blurLines = () => (
  (allFocused.value = false),
  document.querySelectorAll('.selectedLine').forEach((el) => el.classList.toggle('selectedLine'))
)

const focusCell = (e) => (e.target.setAttribute('contenteditable', true), e.target.focus())

const blurCell = (e) => e.target.setAttribute('contenteditable', false)

const resizeColumn = (idx) => {
  allowResize.value = true

  let finalWidth

  const rootElem = document.querySelector('.spreadsheet_content')
  const columnElem = document.querySelector(`.column${idx}`)
  const columnLine = document.querySelector('.column_line')

  const columnLeft = columnElem.getBoundingClientRect().left
  const rootLeft = rootElem.getBoundingClientRect().left

  window.onpointermove = (e) => {
    if (allowResize.value) {
      finalWidth = e.clientX - columnLeft

      columnLine.style.opacity = '1'
      columnLine.style.left = `${e.clientX + rootElem.scrollLeft - rootLeft}px`
    }
  }

  window.onpointerup = () => {
    if (finalWidth) rootElem.style.setProperty(`--column${idx}-width`, `${finalWidth}px`)

    columnLine.style.left = '0'
    columnLine.style.opacity = '0'

    allowResize.value = false
  }
}

const resizeRow = (idx) => {
  allowResize.value = true

  let finalHeight

  const rootElem = document.querySelector('.spreadsheet_content')
  const rowElem = document.querySelector(`.row${idx}`)
  const rowLine = document.querySelector('.row_line')

  const rowTop = rowElem.getBoundingClientRect().top
  const rootTop = rootElem.getBoundingClientRect().top

  window.onpointermove = (e) => {
    if (allowResize.value) {
      finalHeight = e.clientY - rowTop

      rowLine.style.opacity = '1'
      rowLine.style.top = `${e.clientY + rootElem.scrollTop - rootTop}px`
    }
  }

  window.onpointerup = () => {
    if (finalHeight) rootElem.style.setProperty(`--row${idx}-height`, `${finalHeight}px`)

    rowLine.style.top = '0'
    rowLine.style.opacity = '0'

    allowResize.value = false
  }
}

const sortColumn = (idx) => ((sortedCol.value = idx), (sortOrder.value = 'asc'))

const resetSort = () => ((sortedCol.value = null), (sortOrder.value = 'asc'))
</script>

<template>
  <div
    class="spreadsheet_content"
    :style="[`height: ${sheetHeight}`, `width: ${sheetWidth}`, columnsWidths, columnsAlignment]"
  >
    <div class="corner" @click="focusAll"></div>

    <div class="columns">
      <div
        class="column spreadsheet_elem"
        v-for="(letter, idx) in columnsArr"
        :class="`column${idx}`"
        :style="[
          `width: var(--column${idx}-width, 65px)`,
          `justify-content: var(--column-header-align, center)`
        ]"
        :key="letter"
        @click="focusLine(`.column${idx}`)"
      >
        {{ letter }}

        <div v-if="colSorting" class="colum_sort">
          <svg
            v-if="sortedCol !== idx"
            class="sort_icon"
            width="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="sortColumn(idx)"
          >
            <path d="M16 18L16 16M16 6L20 10.125M16 6L12 10.125M16 6L16 13" />
            <path d="M8 18L12 13.875M8 18L4 13.875M8 18L8 11M8 6V8" />
          </svg>

          <template v-else>
            <svg
              class="sort_icon"
              v-if="sortOrder === 'asc'"
              width="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1976d2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              @click="sortOrder = 'desc'"
            >
              <path d="M4 16L13 16" />
              <path d="M6 11H13" />
              <path d="M8 6L13 6" />
              <path d="M17 4L17 20L20 16" />
            </svg>

            <svg
              class="sort_icon"
              v-else-if="sortOrder === 'desc'"
              width="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1976d2"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              @click="resetSort"
            >
              <path d="M4 8H13" />
              <path d="M6 13H13" />
              <path d="M8 18H13" />
              <path d="M17 20V4L20 8" />
            </svg>
          </template>
        </div>

        <div v-if="manualColResize" class="column_resizer" @pointerdown="resizeColumn(idx)"></div>
      </div>
    </div>

    <div class="rows">
      <div
        class="row spreadsheet_elem"
        v-for="(row, idx) in rowsArr"
        :class="`row${idx}`"
        :style="`height: var(--row${idx}-height, 25px)`"
        :key="row"
        @click="focusLine(`.row${idx}`)"
      >
        {{ idx + 1 }}

        <div v-if="manualRowResize" class="row_resizer" @pointerdown="resizeRow(idx)"></div>
      </div>
    </div>

    <div class="cells" @click="blurLines">
      <div class="cell_row" v-for="(cellRow, rowIdx) in rowsArr" :key="cellRow">
        <div
          class="cell spreadsheet_elem"
          v-for="(cell, columnIdx) in columnsArr"
          :class="[`row${rowIdx}`, `column${columnIdx}`]"
          :style="[
            `width: var(--column${columnIdx}-width, 65px)`,
            `height: var(--row${rowIdx}-height, 25px)`
          ]"
          :key="cell"
          tabindex="-1"
        >
          <template v-if="colsFormat[columnIdx] === 'text' || !colsFormat[columnIdx]">
            <div
              class="cell_input"
              :style="[
                `justify-content: var(--column${columnIdx}-x-align, center)`,
                `align-items: var(--column${columnIdx}-y-align, center)`
              ]"
              @dblclick="focusCell"
              @blur="blurCell"
              @keydown.enter.prevent
              @keyup.enter="blurCell"
            >
              {{ filteredData[rowIdx]?.[columnIdx] }}
            </div>
          </template>

          <template v-else-if="colsFormat[columnIdx] === 'check'">
            <input
              type="checkbox"
              :checked="filteredData[rowIdx]?.[columnIdx]"
              class="cell_checkbox"
            />
          </template>

          <template v-else-if="colsFormat[columnIdx] === 'rating'">
            <svg
              v-for="(star, idx) in ratingFunc(filteredData[rowIdx]?.[columnIdx])"
              :key="star + idx"
              width="14"
              viewBox="0 0 24 24"
            >
              <path
                v-if="star"
                d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612
                  14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951
                  7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201
                  8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199
                  13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357
                  15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109
                  21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285
                  20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259
                  20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515
                  21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703
                  15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392
                  13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002
                  8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433
                  7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316
                  5.40838Z"
                fill="#ffeb3b"
                stroke="#ffeb3b"
                stroke-width="2"
                stroke-linecap="round"
              />

              <path
                v-else
                d="M6.03954 7.77203C3.57986 8.32856 2.35002 8.60682 2.05742 9.54773C1.76482 10.4886
                  2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19043 14.4944 5.42868 14.773
                  5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694
                  17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62118 22.3417 7.77268
                  21.8115 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0248 12
                  20.0248C12.3469 20.0248 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273
                  21.8115 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306
                  17.2544M19.7199 13.4299C21.3968 11.4691 22.2352 10.4886 21.9426 9.54773C21.65
                  8.60682 20.4201 8.32856 17.9605 7.77203L17.3241 7.62805C16.6251 7.4699 16.2757
                  7.39083 15.9951 7.17781C15.7144 6.96479 15.5345 6.64193 15.1745 5.99623L14.8468
                  5.40837C13.5802 3.13612 12.9469 2 12 2C11.0531 2 10.4198 3.13613 9.15316 5.40838"
                fill="none"
                stroke="#000"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </template>
        </div>
      </div>
    </div>

    <div class="column_line"></div>
    <div class="row_line"></div>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.spreadsheet_content {
  position: relative;
  overflow-y: scroll;
  color: #444;
  background: #cdcdcd;
  border: 1px solid #cdcdcd;
  font-family: 'Noto Sans', sans-serif;
  font-size: 14px;
  user-select: none;
}

.corner {
  background: #e6e6e6;
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 25px;
  cursor: pointer;
}

.corner:after {
  content: '';
  position: absolute;
  right: 4px;
  bottom: 4px;
  height: 80%;
  width: 100%;
  background: linear-gradient(135deg, transparent 30px, #bbb 30px, #bbb 55px, transparent 55px);
}

.columns {
  position: absolute;
  top: 0;
  left: 41px;
  display: flex;
  gap: 1px;
}

.column {
  position: relative;
  height: 25px;
  padding: 0 5px;
  background: #e6e6e6;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.colum_sort {
  position: absolute;
  right: 5.5px;
  display: flex;
  z-index: 9999;
  border-radius: 4px;
  overflow: hidden;
}

.sort_icon {
  background-color: #e6e6e6;
}

.column_resizer {
  position: absolute;
  right: -3.5px;
  z-index: 9999;
  width: 6px;
  height: 100%;
  background-color: transparent;
  cursor: e-resize;
  transition: all 0.5s;
}

.column_resizer:hover {
  background-color: #005eff;
}

.column_line {
  position: absolute;
  width: 2px;
  height: 100%;
  z-index: 9999;
  background-color: #005eff;
  opacity: 0;
}

.rows {
  position: absolute;
  top: 26px;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.row {
  position: relative;
  width: 40px;
  background: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
}

.row_resizer {
  position: absolute;
  bottom: -2.5px;
  z-index: 9999;
  width: 100%;
  height: 5px;
  background-color: transparent;
  cursor: n-resize;
  transition: all 0.5s;
}

.row_resizer:hover {
  background-color: #005eff;
}

.row_line {
  position: absolute;
  width: 100%;
  height: 2px;
  z-index: 9999;
  background-color: #005eff;
  opacity: 0;
}

.cells {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin: 26px 0 0 41px;
}

.cell_row {
  display: flex;
  gap: 1px;
}

.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  cursor: cell;
}

.cell:focus {
  outline: 2px solid #005eff;
  border-radius: 1px;
  z-index: 9999;
}

[contenteditable='true'] {
  outline: 2px solid #005eff;
  border-radius: 1px;
  z-index: 9999;
  cursor: text;
  box-shadow: rgba(0, 0, 0, 1) 2px 2px 5px;
}

.cell_input {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 0 5px;
}

.cell_checkbox {
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.cell_checkbox::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 0 calc(20px / 2.5) #1677ff;
  border-radius: inherit;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.cell_checkbox::before {
  top: 40%;
  left: 50%;
  content: '';
  position: absolute;
  width: 4px;
  height: 7px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

.cell_checkbox:hover {
  border-color: #1677ff;
}

.cell_checkbox:checked {
  background: #1677ff;
  border-color: transparent;
}

.cell_checkbox:checked::before {
  opacity: 1;
  transform: translate(-50%, -50%) rotate(45deg) scale(1.2);
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
}

.cell_checkbox:active:not(:checked)::after {
  box-shadow: none;
  transition: none;
  opacity: 1;
}

.column.selectedLine,
.row.selectedLine {
  background-color: #8eb0e7;
}

.cell.selectedLine {
  background-color: #e3ecfb;
}
</style>
