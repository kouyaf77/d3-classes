(function() {
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

}).call(this);
