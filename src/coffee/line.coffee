class @Line extends Graph
  constructor: (@el, options) ->
    super

    switch options.type
      when "date"
        @_parse @data

    @_set_scale @data, options.type

    @axis = new LineAxis @stage, @stage_h, @scale_x, @scale_y, options.type

    @line = d3.svg.line()
      .x((d) -> @scale_x d.x)
      .y (d) -> @scale_y d.y

    @interpolate = d3.scale.quantile()
      .domain([0, 1])
      .range(d3.range(1, @data.length + 1))

  _parse: (data) ->
    parse_date = d3.time.format("%Y/%m/%d").parse
    data.forEach (d) ->
      d.x = parse_date d.x

  _set_scale: (data, type) ->
    if !@max_y || @max_y < d3.max(data, (d) -> d.y)
      @max_y = d3.max data, (d) -> d.y

    @scale_x =
      switch type
        when "date"
          d3.time.scale().range [0, @stage_w]
        else
          d3.scale.linear().range [0, @stage_w]
    @scale_x.domain d3.extent data, (d) -> d.x
    @scale_y = d3.scale.linear().range [@stage_h, 0]
    @scale_y.domain [0, @max_y]

  _path_tween: =>
    (t) =>
      @line(@data.slice(0, @interpolate(t)))

  add_line: (data, color) ->
    @_parse data
    @_set_scale data
    @render data, color

  render: ->
    @axis.render()
    @stage.append("path")
      .attr
        "d": @line @data
        fill: "none"
        stroke: @color
        "stroke-width": 2
      .transition()
      .duration(1000)
      .attrTween('d', @_path_tween)
