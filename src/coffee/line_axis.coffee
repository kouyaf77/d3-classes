class @LineAxis
  constructor: (@stage, @stage_h, scale_x, scale_y, type) ->
    @axis_x = switch type
      when "date"
        d3.svg.axis().scale(scale_x).orient('bottom').tickFormat(d3.time.format("%m/%d"))
      else
        d3.svg.axis().scale(scale_x).orient('bottom')

    @axis_y = d3.svg.axis().scale(scale_y).orient('left')

  _render_x: ->
    @stage.append("g")
      .attr
        "class": "x axis"
        "transform": "translate(#{[0, @stage_h]})"
      .call @axis_x

  _render_y: ->
    @stage.append("g")
      .attr
        "class": "y axis"
      .call @axis_y

  render: ->
    @_render_x()
    @_render_y()
