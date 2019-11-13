export function rmap(path, layout, page) {
  return {
    path,
    component: layout,
    children: [
      { path: '', component: page }
    ]
  }
}
