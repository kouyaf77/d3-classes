class @Graph
  DEFAULT_COLOR: "blue"
  DEFAULT_WIDTH: 1000
  DEFAULT_HEIGHT: 270

  constructor: (@el, options) ->
    @data = options.data
    @color = options.color ? @DEFAULT_COLOR
    width = options.width ? @DEFAULT_WIDTH
    height = options.height ? @DEFAULT_HEIGHT

    margin =
      top: 30
      right: 20
      bottom: 30
      left: 50

    @stage_w = width - margin.left - margin.right
    @stage_h = height - margin.top - margin.bottom

    @stage = d3.select("#{@el}")
      .append("svg")
      .attr
          width: @stage_w + margin.left + margin.right
          height: @stage_h + margin.top + margin.bottom
      .append("g")
      .attr "transform", "translate(#{[margin.left, margin.top]})"
