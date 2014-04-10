// Generated by CoffeeScript 1.6.2
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

this.Graph = (function() {
  Graph.prototype.DEFAULT_COLOR = "blue";

  Graph.prototype.DEFAULT_WIDTH = 1000;

  Graph.prototype.DEFAULT_HEIGHT = 270;

  function Graph(el, options) {
    var height, margin, width, _ref, _ref1, _ref2;

    this.el = el;
    this.data = options.data;
    this.color = (_ref = options.color) != null ? _ref : this.DEFAULT_COLOR;
    width = (_ref1 = options.width) != null ? _ref1 : this.DEFAULT_WIDTH;
    height = (_ref2 = options.height) != null ? _ref2 : this.DEFAULT_HEIGHT;
    margin = {
      top: 30,
      right: 20,
      bottom: 30,
      left: 50
    };
    this.stage_w = width - margin.left - margin.right;
    this.stage_h = height - margin.top - margin.bottom;
    this.stage = d3.select("" + this.el).append("svg").attr({
      width: this.stage_w + margin.left + margin.right,
      height: this.stage_h + margin.top + margin.bottom
    }).append("g").attr("transform", "translate(" + [margin.left, margin.top] + ")");
  }

  return Graph;

})();

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

this.Line = (function(_super) {
  __extends(Line, _super);

  function Line(el, options) {
    this.el = el;
    this._path_tween = __bind(this._path_tween, this);
    Line.__super__.constructor.apply(this, arguments);
    switch (options.type) {
      case "date":
        this._parse(this.data);
    }
    this._set_scale(this.data, options.type);
    this.axis = new LineAxis(this.stage, this.stage_h, this.scale_x, this.scale_y, options.type);
    this.line = d3.svg.line().x(function(d) {
      return this.scale_x(d.x);
    }).y(function(d) {
      return this.scale_y(d.y);
    });
    this.interpolate = d3.scale.quantile().domain([0, 1]).range(d3.range(1, this.data.length + 1));
  }

  Line.prototype._parse = function(data) {
    var parse_date;

    parse_date = d3.time.format("%Y/%m/%d").parse;
    return data.forEach(function(d) {
      return d.x = parse_date(d.x);
    });
  };

  Line.prototype._set_scale = function(data, type) {
    if (!this.max_y || this.max_y < d3.max(data, function(d) {
      return d.y;
    })) {
      this.max_y = d3.max(data, function(d) {
        return d.y;
      });
    }
    this.scale_x = (function() {
      switch (type) {
        case "date":
          return d3.time.scale().range([0, this.stage_w]);
        default:
          return d3.scale.linear().range([0, this.stage_w]);
      }
    }).call(this);
    this.scale_x.domain(d3.extent(data, function(d) {
      return d.x;
    }));
    this.scale_y = d3.scale.linear().range([this.stage_h, 0]);
    return this.scale_y.domain([0, this.max_y]);
  };

  Line.prototype._path_tween = function() {
    var _this = this;

    return function(t) {
      return _this.line(_this.data.slice(0, _this.interpolate(t)));
    };
  };

  Line.prototype.add_line = function(data, color) {
    this._parse(data);
    this._set_scale(data);
    return this.render(data, color);
  };

  Line.prototype.render = function() {
    this.axis.render();
    return this.stage.append("path").attr({
      "d": this.line(this.data),
      fill: "none",
      stroke: this.color,
      "stroke-width": 2
    }).transition().duration(1000).attrTween('d', this._path_tween);
  };

  return Line;

})(Graph);