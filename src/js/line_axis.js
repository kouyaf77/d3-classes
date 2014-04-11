(function() {
  this.LineAxis = (function() {
    function LineAxis(stage, stage_h, scale_x, scale_y, type) {
      this.stage = stage;
      this.stage_h = stage_h;
      this.axis_x = (function() {
        switch (type) {
          case "date":
            return d3.svg.axis().scale(scale_x).orient('bottom').tickFormat(d3.time.format("%m/%d"));
          default:
            return d3.svg.axis().scale(scale_x).orient('bottom');
        }
      })();
      this.axis_y = d3.svg.axis().scale(scale_y).orient('left');
    }

    LineAxis.prototype._render_x = function() {
      return this.stage.append("g").attr({
        "class": "x axis",
        "transform": "translate(" + [0, this.stage_h] + ")"
      }).call(this.axis_x);
    };

    LineAxis.prototype._render_y = function() {
      return this.stage.append("g").attr({
        "class": "y axis"
      }).call(this.axis_y);
    };

    LineAxis.prototype.render = function() {
      this._render_x();
      return this._render_y();
    };

    return LineAxis;

  })();

}).call(this);
