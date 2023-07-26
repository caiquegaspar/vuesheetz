<script setup>
const features = [
  { label: 'Intuitive spreadsheet-like interface', done: true },
  { label: 'Convenient API', done: true },
  { label: 'Multiple column sorting', done: true },
  { label: 'Validating data', done: true },
  { label: 'Columns text and number formatting', done: true },
  { label: 'Resizing rows and columns', done: true },
  { label: 'Filtering data', done: false },
  { label: 'Moving columns and rows', done: false },
  { label: 'Hiding columns and rows', done: false },
  { label: 'Import and export of data to spreadsheet', done: false },
  { label: 'Import and export of data to JSON', done: false },
  { label: 'Auto hiding empty columns and rows', done: false },
  { label: 'Interface localization', done: false },
  { label: 'Drop-down lists in cells', done: false },
  { label: 'Searching and filtering data', done: false },
  { label: 'Undo and redo operations', done: false },
  { label: 'Freezing columns and rows', done: false },
  { label: 'Math formulas and string functions', done: false },
  { label: 'Hotkeys navigation', done: false },
  { label: 'Ability to add a Datetime Picker', done: false },
  { label: 'Ability to wrap or clip long text', done: false },
  { label: 'Read-only mode', done: false },
  { label: 'Auto filling of cells', done: false },
  { label: 'Merging cells', done: false },
  { label: 'Auto-width for columns', done: false },
  { label: 'Hyperlinks', done: false },
  { label: 'Multiple sheets', done: false }
]
</script>

<template>
  <ul class="features_list">
    <li v-for="feature in features" :key="feature">
      <div>
        <svg width="1.5rem" viewBox="0 0 24 24" fill="none">
          <animateTransform
            id="rotate_animation"
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0"
            to="360"
            dur="1s"
            begin="0s"
            repeatCount="3"
          />

          <g stroke="#facc15" stroke-width="1.8" stroke-linecap="round">
            <path
              d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228
              17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
            />

            <animate
              attributeName="stroke"
              from="#facc15"
              :to="feature.done ? '#66ba1c' : '#f87171'"
              begin="rotate_animation.end"
              dur="0.7s"
              repeatCount="1"
              restart="never"
              fill="freeze"
            />

            <path v-if="feature.done" d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke-opacity="0">
              <animate
                attributeName="stroke-opacity"
                from="0"
                to="1"
                begin="rotate_animation.end"
                dur="0.7s"
                repeatCount="1"
                restart="never"
                fill="freeze"
              />
            </path>

            <path v-else d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke-opacity="0">
              <animate
                attributeName="stroke-opacity"
                from="0"
                to="1"
                begin="rotate_animation.end"
                dur="0.7s"
                repeatCount="1"
                restart="never"
                fill="freeze"
              />
            </path>
          </g>
        </svg>
      </div>

      <span>{{ feature.label }}</span>
    </li>
  </ul>
</template>

<style scoped>
.features_list li {
  font-size: 1.2rem;
  line-height: 2.6rem;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0 5px;
}

.features_list {
  padding: 0;
}
</style>
