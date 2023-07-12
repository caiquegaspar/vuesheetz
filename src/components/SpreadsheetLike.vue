<script setup>
import { ref } from 'vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

const alpha = Array.from(Array(26)).map((_, i) => i + 65)
const alphabet = alpha.map((x) => String.fromCharCode(x))

const columnsArr = ref(alphabet)
// const rowsArr = ref(alphabet)
const allFocused = ref(false)
const allowResize = ref(false)

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

const resizeColumn = (className) => {
  allowResize.value = true

  let finalWidth

  const columnElem = document.querySelector(className)
  const columnLine = document.querySelector('.column_line')
  const columnCells = document.querySelectorAll(className)

  const { left } = columnElem.getBoundingClientRect()

  window.onpointermove = (e) => {
    if (allowResize.value) {
      finalWidth = e.clientX - left

      columnLine.style.opacity = '1'
      columnLine.style.left = `${e.clientX}px`
    }
  }

  window.onpointerup = () => {
    columnCells.forEach((el) => (el.style.width = `${finalWidth}px`))

    columnLine.style.left = '0'
    columnLine.style.opacity = '0'

    allowResize.value = false
  }
}

const resizeRow = (className) => {
  allowResize.value = true

  let finalHeight

  const rowElem = document.querySelector(className)
  const rowLine = document.querySelector('.row_line')
  const rowCells = document.querySelectorAll(className)

  const { top } = rowElem.getBoundingClientRect()

  window.onpointermove = (e) => {
    if (allowResize.value) {
      finalHeight = e.clientY - top

      rowLine.style.opacity = '1'
      rowLine.style.top = `${e.clientY}px`
    }
  }

  window.onpointerup = () => {
    rowCells.forEach((el) => (el.style.height = `${finalHeight}px`))

    rowLine.style.top = '0'
    rowLine.style.opacity = '0'

    allowResize.value = false
  }
}
</script>

<template>
  <div class="spreadsheet_content" style="--cell-width: 65px; --cell-height: 25px">
    <div class="corner" @click="focusAll"></div>

    <div class="columns">
      <div
        class="column spreadsheet_elem"
        v-for="(letter, idx) in columnsArr"
        :class="`column${idx}-width`"
        :key="letter"
        @click="focusLine(`.column${idx}-width`)"
      >
        {{ letter }}

        <div class="column_resizer" @pointerdown="resizeColumn(`.column${idx}-width`)"></div>
      </div>
    </div>

    <div class="rows">
      <div
        class="row spreadsheet_elem"
        v-for="(row, idx) in data"
        :class="`row${idx}-height`"
        :key="row"
        @click="focusLine(`.row${idx}-height`)"
      >
        {{ idx + 1 }}

        <div class="row_resizer" @pointerdown="resizeRow(`.row${idx}-height`)"></div>
      </div>
    </div>

    <div class="cells" @click="blurLines">
      <div class="cell_row" v-for="(cellRow, rowIdx) in data" :key="cellRow">
        <div
          class="cell spreadsheet_elem"
          v-for="(cell, columnIdx) in cellRow"
          :class="[`row${rowIdx}-height`, `column${columnIdx}-width`]"
          :style="``"
          :key="cell"
          tabindex="-1"
          @dblclick="focusCell"
          @blur="blurCell"
          @keydown.enter.prevent
          @keyup.enter="blurCell"
        >
          {{ cell }}
        </div>
      </div>
    </div>

    <div class="column_line"></div>
    <div class="row_line"></div>
  </div>
</template>

<style scoped>
.spreadsheet_content {
  position: relative;
  height: 100vh;
  overflow: visible;
  color: #444;
  background: #cdcdcd;
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
  width: var(--cell-width);
  height: 25px;
  background: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.column_resizer {
  position: absolute;
  right: -2.5px;
  z-index: 9999;
  width: 5px;
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
  height: var(--cell-height);
  background: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  width: var(--cell-width);
  height: var(--cell-height);
  justify-content: center;
  align-items: center;
  background: #fff;
  cursor: cell;
  overflow: hidden;
}

.cell:focus {
  outline: 2px solid #005eff;
  border-radius: 1px;
  z-index: 9999;
}

[contenteditable='true'] {
  cursor: text;
  box-shadow: rgba(0, 0, 0, 1) 2px 2px 5px;
}

.column.selectedLine,
.row.selectedLine {
  background-color: #8eb0e7;
}

.cell.selectedLine {
  background-color: #e3ecfb;
}
</style>
