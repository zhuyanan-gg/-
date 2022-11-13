export const imgerror = {
  inserted(el, binding) {
    el.onerror = function() {
      // binding表示传入的参数的对象形式，用.value的形式可以拿到真正的传入的值
    //   console.log(binding)
      el.src = binding.value
    }
  }
}
