// import { defineAnimation } from './animation'
// import { isUndefined } from '@newcar/utils'

// export const changeProperty = (
//   prop: string | string[],
//   from?: number | number[],
//   to?: number | number[],
// ) => {
//   return defineAnimation({
//     act(
//       widget,
//       elapsed,
//       process,
//       params?: {
//         from: number | number[]
//         to: number | number[]
//       },
//     ) {
//       console.log(to);
      
//       if (!Array.isArray(prop)) {
//         ;(widget as Record<string, any>)[prop] =
//           ((!isUndefined(to) ? to : params.to) as number) +
//           (((!isUndefined(to) ? to : params.to) as number) -
//             ((!isUndefined(from) ? from : params.from) as number)) *
//             process
//       } else {
//         let index = 0
//         for (const p of prop) {
//           ;(widget as Record<string, any>)[p] =
//           ((!isUndefined((to as number[])) ? (to as number[]) : (params.to as number[])))[index] +
//           (((!isUndefined((to as number[])) ? (to as number[]) : (params.to as number[])))[index] -
//             ((!isUndefined((from as number[])) ? (from as number[]) : (params.from as number[])))[index]) *
//             process
//           index += 1
//         }
//       }
//     },
//   })
// }