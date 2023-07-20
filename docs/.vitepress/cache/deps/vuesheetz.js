import {
  Fragment,
  computed,
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  normalizeClass,
  normalizeStyle,
  onMounted,
  openBlock,
  popScopeId,
  pushScopeId,
  ref,
  renderList,
  toDisplayString,
  watch,
  withKeys,
  withModifiers
} from "./chunk-67UUJLDS.js";

// node_modules/.pnpm/vuesheetz@0.1.1/node_modules/vuesheetz/dist/vue-sheetz.js
var ke = (r, u) => {
  const b = r.__vccOpts || r;
  for (const [q, z] of u)
    b[q] = z;
  return b;
};
var d = (r) => (pushScopeId("data-v-9ee6fad5"), r = r(), popScopeId(), r);
var Ce = { class: "columns" };
var we = ["onClick"];
var $e = {
  key: 0,
  class: "colum_sort"
};
var Le = ["onClick"];
var Se = d(() => createBaseVNode("path", { d: "M16 18L16 16M16 6L20 10.125M16 6L12 10.125M16 6L16 13" }, null, -1));
var be = d(() => createBaseVNode("path", { d: "M8 18L12 13.875M8 18L4 13.875M8 18L8 11M8 6V8" }, null, -1));
var Ae = [
  Se,
  be
];
var Me = ["onClick"];
var Be = d(() => createBaseVNode("path", { d: "M4 16L13 16" }, null, -1));
var Fe = d(() => createBaseVNode("path", { d: "M6 11H13" }, null, -1));
var qe = d(() => createBaseVNode("path", { d: "M8 6L13 6" }, null, -1));
var ze = d(() => createBaseVNode("path", { d: "M17 4L17 20L20 16" }, null, -1));
var Ee = [
  Be,
  Fe,
  qe,
  ze
];
var He = d(() => createBaseVNode("path", { d: "M4 8H13" }, null, -1));
var De = d(() => createBaseVNode("path", { d: "M6 13H13" }, null, -1));
var Ke = d(() => createBaseVNode("path", { d: "M8 18H13" }, null, -1));
var Re = d(() => createBaseVNode("path", { d: "M17 20V4L20 8" }, null, -1));
var Ve = [
  He,
  De,
  Ke,
  Re
];
var Ne = ["onPointerdown"];
var Pe = { class: "rows" };
var Te = ["onClick"];
var We = ["onPointerdown"];
var je = ["onKeyup"];
var Ue = ["checked"];
var Oe = {
  key: 2,
  width: "90%",
  height: "12"
};
var Xe = d(() => createBaseVNode("rect", {
  width: "100%",
  height: "100%",
  x: "0",
  y: "0",
  rx: "6",
  ry: "6",
  fill: "#EDEDED"
}, null, -1));
var Ye = ["width", "fill"];
var Ze = ["fill", "stroke"];
var Ge = ["value", "onKeyup", "onKeydown", "onInput"];
var Je = ["value", "onKeyup", "onInput"];
var Qe = d(() => createBaseVNode("div", { class: "column_line" }, null, -1));
var xe = d(() => createBaseVNode("div", { class: "row_line" }, null, -1));
var Ie = {
  __name: "VueSheetzComponent",
  props: {
    data: {
      type: Array,
      required: true
    },
    height: {
      type: [String, Number],
      default: "100%"
    },
    width: {
      type: [String, Number],
      default: "100%"
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
  },
  setup(r) {
    const u = r, b = computed(() => {
      const e = ["px", "em", "rem", "%", "vw", "vh"], { height: t } = u;
      return e.some((n) => t.toString().includes(n)) ? t : `${t}px`;
    }), q = computed(() => {
      const e = ["px", "em", "rem", "%", "vw", "vh"], { width: t } = u;
      return e.some((n) => t.toString().includes(n)) ? t : `${t}px`;
    }), z = computed(() => {
      let e = "";
      const t = { left: "start", center: "center", right: "end" };
      return u.colHeaders && (e += "--column-header-align: start;"), u.colsAlignment && (e += u.colsAlignment.reduce(
        (o, n, s) => n ? o += `--column${s}-x-align: ${t[n]};` : o,
        ""
      )), e;
    }), V = computed(() => u.colHeaders ? u.colHeaders : se), E = structuredClone(u.data), $ = Array(26).fill(null).map((e, t) => t + 65).map((e) => String.fromCharCode(e)), oe = u.data.reduce((e, { length: t }) => e = t > e ? t : e, 0), le = Math.min(Math.max(oe, 26), 702), se = Array(le).fill(null).reduce((e, t, o) => {
      const n = Math.floor(o / $.length), s = $[o] ?? $[n - 1] + $[o - n * $.length];
      return e = [...e, s];
    }, []), N = ref(Math.max(u.data.length, 100)), A = ref(false), m = ref(false), M = ref(null), B = ref("asc"), re = ref(""), h = ref(E), P = () => {
      u.colWidths && u.colWidths.forEach(
        (e, t) => document.querySelector(".spreadsheet_content").style.setProperty(`--column${t}-width`, `${e}px`)
      );
    }, ce = () => M.value !== null ? h.value = structuredClone(E).sort((e, t) => {
      const o = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" }), n = M.value, s = B.value === "asc", l = o.compare(e[n], t[n]);
      return s ? l : l * -1;
    }) : h.value = E, ie = (e) => {
      const o = Object.entries({
        33: "#f44336",
        66: "#1677ff",
        100: "#4caf50"
      }).find(([n]) => e <= n);
      return o ? o[1] : "";
    }, ae = (e) => [...Array(5).fill(true), ...Array(5).fill(false)].slice(5 - e, 10 - e), ue = () => {
      const e = document.querySelectorAll(".spreadsheet_elem");
      if (A.value) {
        A.value = false, e.forEach((t) => t.classList.remove("selectedLine"));
        return;
      }
      A.value = true, e.forEach((t) => t.classList.add("selectedLine")), document.querySelector(".cells").removeAttribute("style");
    }, T = (e) => {
      const t = document.querySelector(".cells");
      W(), document.querySelectorAll(`.${e}`).forEach((o) => o.classList.toggle("selectedLine")), t.style.setProperty(`--${e}-border`, "2px");
    }, W = () => {
      A.value = false, document.querySelectorAll(".selectedLine").forEach((e) => e.classList.toggle("selectedLine")), document.querySelector(".cells").removeAttribute("style");
    }, H = (e) => {
      e.target.setAttribute("contenteditable", true), document.getSelection().collapse(e.target, e.target.childNodes.length), e.target.focus();
    }, g = (e) => e.target.setAttribute("contenteditable", false), de = (e) => {
      m.value = true;
      let t;
      const o = document.querySelector(".spreadsheet_content"), n = document.querySelector(`.column${e}`), s = document.querySelector(".column_line"), l = n.getBoundingClientRect().left, _ = o.getBoundingClientRect().left;
      window.onpointermove = (y) => {
        m.value && (t = y.clientX - l, s.style.opacity = "1", s.style.left = `${y.clientX + o.scrollLeft - _}px`);
      }, window.onpointerup = () => {
        t && o.style.setProperty(`--column${e}-width`, `${t}px`), s.style.left = "0", s.style.opacity = "0", m.value = false;
      };
    }, he = (e) => {
      m.value = true;
      let t;
      const o = document.querySelector(".spreadsheet_content"), n = document.querySelector(`.row${e}`), s = document.querySelector(".row_line"), l = n.getBoundingClientRect().top, _ = o.getBoundingClientRect().top;
      window.onpointermove = (y) => {
        m.value && (t = y.clientY - l, s.style.opacity = "1", s.style.top = `${y.clientY + o.scrollTop - _}px`);
      }, window.onpointerup = () => {
        t && o.style.setProperty(`--row${e}-height`, `${t}px`), s.style.top = "0", s.style.opacity = "0", m.value = false;
      };
    }, D = (e, t) => {
      M.value = e, B.value = t, ce();
    }, j = (e, t) => {
      const o = `${e}`.split("");
      return t.replace(/#/g, () => o.shift()).replace(/undefined/g, "");
    }, U = (e, t = null) => {
      const o = e.target.getAttribute("value");
      e.key === "Backspace" ? e.target.setAttribute("value", o.slice(0, -1)) : (t == null ? void 0 : t.replace(/[^#]/g, "").length) <= o.length ? e.preventDefault() : e.key.length === 1 && e.key !== " " && e.target.setAttribute("value", o + e.key);
    }, ve = ({ target: e }, t) => {
      const o = e.getAttribute("value"), n = j(o, t);
      o ? e.textContent = n : e.innerHTML = "&nbsp;", queueMicrotask(() => document.getSelection().collapse(e, e.childNodes.length));
    }, ye = ({ target: e }, t) => {
      const o = e.getAttribute("value"), n = t(o);
      o ? e.textContent = n : e.innerHTML = "&nbsp;", queueMicrotask(() => document.getSelection().collapse(e, e.childNodes.length));
    };
    return onMounted(() => P()), watch(
      () => u.colWidths,
      (e, t) => {
        e !== t && P();
      }
    ), (e, t) => (openBlock(), createElementBlock("div", {
      class: "spreadsheet_content",
      style: normalizeStyle([`height: ${b.value}`, `width: ${q.value}`, re.value, z.value])
    }, [
      createBaseVNode("div", {
        class: "corner",
        onClick: ue
      }),
      createBaseVNode("div", Ce, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(V.value, (o, n) => (openBlock(), createElementBlock("div", {
          class: normalizeClass(["column spreadsheet_elem", `column${n}`]),
          style: normalizeStyle([
            `width: var(--column${n}-width, 65px)`,
            "justify-content: var(--column-header-align, center)"
          ]),
          key: o,
          onClick: (s) => T(`column${n}`)
        }, [
          createTextVNode(toDisplayString(o) + " ", 1),
          r.colSorting ? (openBlock(), createElementBlock("div", $e, [
            M.value !== n ? (openBlock(), createElementBlock("svg", {
              key: 0,
              class: "sort_icon",
              width: "17",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "#666",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              onClick: (s) => D(n, "asc")
            }, Ae, 8, Le)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              B.value === "asc" ? (openBlock(), createElementBlock("svg", {
                key: 0,
                class: "sort_icon",
                width: "17",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#1677ff",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                onClick: (s) => D(n, "desc")
              }, Ee, 8, Me)) : B.value === "desc" ? (openBlock(), createElementBlock("svg", {
                key: 1,
                class: "sort_icon",
                width: "17",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#1677ff",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                onClick: t[0] || (t[0] = (s) => D(null, "asc"))
              }, Ve)) : createCommentVNode("", true)
            ], 64))
          ])) : createCommentVNode("", true),
          r.manualColResize ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "column_resizer",
            onPointerdown: (s) => de(n)
          }, null, 40, Ne)) : createCommentVNode("", true)
        ], 14, we))), 128))
      ]),
      createBaseVNode("div", Pe, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(N.value, (o, n) => (openBlock(), createElementBlock("div", {
          class: normalizeClass(["row spreadsheet_elem", `row${n}`]),
          style: normalizeStyle(`height: var(--row${n}-height, 25px)`),
          key: o,
          onClick: (s) => T(`row${n}`)
        }, [
          createTextVNode(toDisplayString(n + 1) + " ", 1),
          r.manualRowResize ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "row_resizer",
            onPointerdown: (s) => he(n)
          }, null, 40, We)) : createCommentVNode("", true)
        ], 14, Te))), 128))
      ]),
      createBaseVNode("div", {
        class: "cells",
        onClick: W,
        onKeyup: t[5] || (t[5] = (o) => o.key === "Delete" ? console.log(o.target) : "")
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(N.value, (o, n) => (openBlock(), createElementBlock("div", {
          class: "cell_row",
          key: o
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(V.value, (s, l) => {
            var _, y, O, X, Y, Z, G, J, Q, x, I, ee, te;
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["cell spreadsheet_elem", [`row${n}`, `column${l}`]]),
              style: normalizeStyle([
                `width: var(--column${l}-width, 65px)`,
                `height: var(--row${n}-height, 25px)`
              ]),
              key: s,
              tabindex: "-1"
            }, [
              !((_ = r.colsFormat) != null && _[l]) || r.colsFormat[l] === "text" ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "cell_input",
                style: normalizeStyle([
                  `justify-content: var(--column${l}-x-align, center)`,
                  `align-items: var(--column${l}-y-align, center)`
                ]),
                onDblclick: H,
                onBlur: g,
                onKeydown: t[1] || (t[1] = withKeys(withModifiers(() => {
                }, ["prevent"]), ["enter"])),
                onKeyup: withKeys(g, ["enter"]),
                onInput: t[2] || (t[2] = ({ target: v }) => v.innerHTML ? "" : v.innerHTML = " ")
              }, toDisplayString((y = h.value[n]) == null ? void 0 : y[l]), 45, je)) : r.colsFormat[l] === "check" ? (openBlock(), createElementBlock("input", {
                key: 1,
                type: "checkbox",
                checked: (O = h.value[n]) == null ? void 0 : O[l],
                class: "cell_checkbox"
              }, null, 8, Ue)) : r.colsFormat[l] === "progress" ? (openBlock(), createElementBlock("svg", Oe, [
                createBaseVNode("title", null, toDisplayString((X = h.value[n]) == null ? void 0 : X[l]) + "%", 1),
                Xe,
                createBaseVNode("rect", {
                  width: `${(Y = h.value[n]) == null ? void 0 : Y[l]}%`,
                  height: "100%",
                  x: "0",
                  y: "0",
                  rx: "6",
                  ry: "6",
                  fill: ie((Z = h.value[n]) == null ? void 0 : Z[l])
                }, null, 8, Ye)
              ])) : r.colsFormat[l] === "rating" ? (openBlock(true), createElementBlock(Fragment, { key: 3 }, renderList(ae((G = h.value[n]) == null ? void 0 : G[l]), (v, pe) => (openBlock(), createElementBlock("svg", {
                key: v + pe,
                width: "14",
                viewBox: "0 0 24 24"
              }, [
                createBaseVNode("path", {
                  d: `M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612\r
                  14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951\r
                  7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201\r
                  8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199\r
                  13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357\r
                  15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109\r
                  21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285\r
                  20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259\r
                  20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515\r
                  21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703\r
                  15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392\r
                  13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002\r
                  8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433\r
                  7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316\r
                  5.40838Z`,
                  fill: v ? "#ffeb3b" : "none",
                  stroke: v ? "#ffeb3b" : "#000",
                  "stroke-width": "2",
                  "stroke-linecap": "round"
                }, null, 8, Ze)
              ]))), 128)) : (Q = (J = r.colsFormat[l]).includes) != null && Q.call(J, "#") ? (openBlock(), createElementBlock("div", {
                key: 4,
                class: "cell_input",
                style: normalizeStyle([
                  `justify-content: var(--column${l}-x-align, center)`,
                  `align-items: var(--column${l}-y-align, center)`
                ]),
                value: (x = h.value[n]) == null ? void 0 : x[l],
                onDblclick: H,
                onBlur: g,
                onKeydown: [
                  t[3] || (t[3] = withKeys(withModifiers(() => {
                  }, ["prevent"]), ["enter"])),
                  (v) => U(v, r.colsFormat[l])
                ],
                onKeyup: withKeys(g, ["enter"]),
                onInput: (v) => ve(v, r.colsFormat[l])
              }, toDisplayString(j((I = h.value[n]) == null ? void 0 : I[l], r.colsFormat[l])), 45, Ge)) : typeof r.colsFormat[l] == "function" ? (openBlock(), createElementBlock("div", {
                key: 5,
                class: "cell_input",
                style: normalizeStyle([
                  `justify-content: var(--column${l}-x-align, center)`,
                  `align-items: var(--column${l}-y-align, center)`
                ]),
                value: (ee = h.value[n]) == null ? void 0 : ee[l],
                onDblclick: H,
                onBlur: g,
                onKeydown: [
                  t[4] || (t[4] = withKeys(withModifiers(() => {
                  }, ["prevent"]), ["enter"])),
                  U
                ],
                onKeyup: withKeys(g, ["enter"]),
                onInput: (v) => ye(v, r.colsFormat[l])
              }, toDisplayString(r.colsFormat[l]((te = h.value[n]) == null ? void 0 : te[l])), 45, Je)) : createCommentVNode("", true),
              createBaseVNode("div", {
                class: "border_line",
                style: normalizeStyle(`border-width: var(--row${n}-border, 0) var(--column${l}-border, 0)`)
              }, null, 4)
            ], 6);
          }), 128))
        ]))), 128))
      ], 32),
      Qe,
      xe
    ], 4));
  }
};
var nt = ke(Ie, [["__scopeId", "data-v-9ee6fad5"]]);
export {
  nt as VueSheetzComponent
};
//# sourceMappingURL=vuesheetz.js.map
