import { Figure } from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import type { DateTime, DateTimeUnit } from 'luxon'
import type { Color, Shader } from '../../../../packages/utils/src'
import type { ChartLayout } from './chartLayout'
import type { ChartDataUnit } from './chartDataUnit'

/**
 * ChartAxisOptions
 * @interface
 * @category General
 * @description
 * ChartAxisOptions is an interface that defines the options of an axis in a chart.
 */
export interface ChartAxisOptions extends WidgetOptions {
  /**
   * @property number beginAtZero
   * @description
   * beginAtZero is a boolean that represents whether the axis begins at zero.
   * It is optional.
   * If not provided, the beginAtZero will be `true`.
   */
  beginAtZero?: boolean
  /**
   * @property number suggestedMin
   * @description
   * suggestedMin is a number that represents the suggested minimum value of the axis.
   * If no data below the suggestedMin, the axis will begin at the suggestedMin.
   * It is optional.
   * If not provided, the suggestedMin will be `0` when `beginAtZero` is `true` and `undefined` when `beginAtZero` is `false`.
   */
  suggestedMin?: number | DateTime
  /**
   * @property number suggestedMax
   * @description
   * suggestedMax is a number that represents the suggested maximum value of the axis.
   * If no data above the suggestedMax, the axis will end at the suggestedMax.
   * It is optional.
   * If not provided, the suggestedMax will be `undefined`.
   */
  suggestedMax?: number | DateTime
  /**
   * @property Color girdColor
   * @description
   * gridColor is a color that represents the color of the grid lines.
   * It is optional.
   * If not provided, the gridColor will be `Color.WHITE`.
   */
  gridColor?: Color
  /**
   * @property number gridWidth
   * @description
   * gridWidth is a number that represents the width of the grid lines.
   * It is optional.
   * If not provided, the gridWidth will be `1`.
   */
  gridWidth?: number
}

/**
 * DateTimeFormatOptions
 * @interface
 * @category General
 * @description
 * DateTimeFormatOptions is an interface that defines the options of the date time format.
 */
export interface DateTimeFormatOptions {
  year: 'year'
  quarter: 'quarter'
  month: 'month' | 'monthShort' | 'monthLong'
  week: 'weekNumber'
  day: 'day' | 'weekday' | 'localWeekNumber' | 'weekdayLong' | 'weekdayShort' | 'ordinal'
  hour: 'hour'
  minute: 'minute'
  second: 'second'
  millisecond: 'millisecond'
}

/**
 * BaseChartOptions
 * @interface
 * @category General
 * @description
 * BaseChartOptions is an interface that defines the options of a chart.
 */
export interface BaseChartOptions extends ChartAxisOptions {
  /**
   * @property 'x' | 'y' indexAxis
   * @description
   * indexAxis is a string that represents the index-axis of the chart.
   * It is optional.
   * If not provided, the index-axis will be 'x'.
   */
  indexAxis?: 'x' | 'y'
  /**
   * @property 'number' | 'label' | 'date' indexType
   * @description
   * indexType is a string that represents the type of the index-axis.
   * To be noted that the indexType can't be mixed in a chart.
   * It is optional.
   * If not provided, the indexType will be 'label' when labels are provided as strings,
   * 'date' when labels are provided as DateTimes or {@link ChartDataUnit#isIndexDate} are DateTimes.
   * and 'number' when {@link ChartDataUnit#isIndexDate} are not DateTimes.
   */
  indexType?: 'label' | 'number' | 'date'
  /**
   * @property DateTimeUnit indexIntervalUnit
   * @description
   * indexIntervalUnit is a string that represents the interval unit of the index-axis.
   * To be noted that the indexIntervalUnit only works when the indexType is 'date'.
   * It is optional.
   * If not provided, the indexIntervalUnit will be generated automatically.
   */
  indexIntervalUnit?: DateTimeUnit
  /**
   * @property DateTimeFormatOptions dateFormatOptions
   * @description
   * dateFormatOptions is an object that defines the options of the date time format.
   */
  dateFormatOptions?: DateTimeFormatOptions
  /**
   * @property object axis
   * @description
   * axis is an object that defines the options of the axes in the chart.
   */
  axis?: {
    /**
     * @property ChartAxisOptions index
     * @description
     * index is an object that defines the options of the index-axis in the chart.
     */
    index?: ChartAxisOptions
    /**
     * @property ChartAxisOptions cross
     * @description
     * cross is an object that defines the options of the cross-axis in the chart.
     */
    cross?: ChartAxisOptions
  }
  /**
   * @property object size
   * @description
   * size is an object that defines the size of the chart.
   * It is optional.
   * If not provided, the size will be `{ width:300, height: 300 }` as default.
   */
  size?: {
    /**
     * @property number width
     * @description
     * width is a number that represents the width of the chart.
     * To be noted that the width is the width of chart layout (excluding label, legend, etc.).
     */
    width: number
    /**
     * @property number height
     * @description
     * height is a number that represents the height of the chart.
     * To be noted that the height is the height of chart layout (excluding label, legend, etc.).
     */
    height: number
  }
  /**
   * @property boolean gridAlign
   * @description
   * gridAlign is a boolean that represents whether the grid labels are aligned with the grid or line&ticks.
   * It is optional.
   * If not provided, the gridAlign will be `true` for `BarChart` and `false` for other types.
   */
  gridAlign?: boolean
  /**
   * @property boolean edgeOffset
   * @description
   * edgeOffset is a boolean that represents whether the chart has an edge offset which is half of the interval.
   * It is optional.
   * If not provided, the edgeOffset will be `false` when `gridAlign` is `true` and `true` when `gridAlign` is `false`.
   */
  edgeOffset?: boolean
  /**
   * @property ChartLayout layout
   * @description
   * layout is an object that defines the layout of the chart.
   * To be noted that when the layout is provided, the size of the chart will be ignored, and the layout will be used to calculate the size.
   * What's more, the layout **won't** be added as child of the chart, which means the layout should be added to the scene manually.
   * It is optional.
   * If not provided, the layout will be generated automatically.
   */
  layout?: ChartLayout
}

/**
 * BaseChartStyle
 * @interface
 * @category General
 * @description
 * BaseChartStyle is an interface that defines the style of a chart.
 */
export interface BaseChartStyle extends WidgetStyle {
  /**
   * @property Color backgroundColor
   * @description
   * backgroundColor is a color that represents the background color of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  backgroundColor?: Color
  /**
   * @property Shader backgroundShader
   * @description
   * backgroundShader is a shader that represents the background shader of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  backgroundShader?: Shader
  /**
   * @property boolean border
   * @description
   * border is a boolean that represents whether the dataUnit has a border.
   */
  border?: boolean
  /**
   * @property Color borderColor
   * @description
   * borderColor is a color that represents the border color of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  borderColor?: Color
  /**
   * @property Shader borderShader
   * @description
   * borderShader is a shader that represents the border shader of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  borderShader?: Shader
  /**
   * @property number borderWidth
   * @description
   * borderWidth is a number that represents the border width of the dataUnit, which may be displayed in various forms.
   * It is optional.
   */
  borderWidth?: number
}

/**
 * BaseChartDataSet
 * @interface
 * @category General
 * @description
 * BaseChartDataSet is an interface that defines the structure of a dataset in a chart.
 */
export interface BaseChartDataSet {
  /**
   * @property string label
   * @description
   * label is a string that represents the label of the dataset.
   * It is displayed in the legend of the chart.
   */
  label: string
  /**
   * @property ChartDataUnit<BaseChartStyle>[] data
   * @description
   * data is an array of data units that represent the data points of the dataset.
   */
  data: ChartDataUnit<BaseChartStyle>[]
  /**
   * @property BaseChartStyle style
   * @description
   * style is an object that defines the style of the dataset.
   */
  style?: BaseChartStyle
}

/**
 * BaseChartData
 * @interface
 * @category General
 * @description
 * BaseChartData is an interface that defines the structure of the data in a chart.
 */
export interface BaseChartData {
  /**
   * @property string[] labels
   * @description
   * labels is an array of strings that represent the labels of the chart, which are displayed on the index-axis.
   * It is optional.
   * If not provided, the labels will be generated automatically.
   */
  labels?: string[] | DateTime[]
  /**
   * @property BaseChartDataSet[] datasets
   * @description
   * datasets is an array of datasets that represent the data of the chart.
   */
  datasets: BaseChartDataSet[]
  /**
   * @property BaseChartStyle style
   * @description
   * style is an object that defines the style of the chart.
   */
  style?: BaseChartStyle
}

/**
 * BaseChart
 * @class
 * @category General
 * @description
 * BaseChart is a class that extends Figure and is used to create a chart widget.
 * It is the base class for other chart classes.
 * It should not be instantiated directly.
 */
export class BaseChart extends Figure {
  /**
   * BaseChart constructor.
   * @constructor
   * @param {BaseChartOptions} options - The options of the chart.
   */
  constructor(
    options?: BaseChartOptions,
  ) {
    options ??= {}
    super(options)
  }
}
