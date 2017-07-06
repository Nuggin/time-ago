/* Time Ago
 * ----------
 * Small, crude tool for estimating how it has been since some Date.
 * Allows users to customize the output String's formatting as well
 * as the buckets in which to lump dates.
 * 
 * Limitations: breakpoints (and names) must be in increasing order
 * 
 * @author Nguyen Phan
 * @license MIT
 */

'use strict'

(function () {
    var options = {
            breakpoints: [6e+4,3.6e+6,8.64e+7,6.048e+8,2.6784e+9,3.15576e+10],
            names: ["min", "hr", "day", "wk", "mo", "yr"],
            prefix: "< a ",
            suffix: " ago",
            default: "> 1 yr ago"
        }
    
    /* timeAgo
     * ------------
     * Calculates time elapsed between this date and now, bucketed
     * according to break points in the `options` object. O(# brk pts)
     * @return - a string specifying which bucket this date belongs to
     */
    Date.prototype.timeAgo = function () {
        var diff = Date.now() - this.getTime();
        var len  = options.breakpoints.length;
        
        for (var i = 0; i < len; i++) {
            if (diff <= options.breakpoints[i]) {
                return options.prefix + options.names[i] + options.suffix;
            }
        }
        
        return options.default;
    };
    
    /* timeAgoConfig
     * -------------
     * Allows users to override default break points, names, and strings.
     * Enforces a strict requirement that each breakpoint has its own name.
     * @return - whether the existing configurations were modified.
     */
    Date.prototype.timeAgoConfig = function (opts) {
        var brkLen = (opts.breakpoints || options.breakpoints).length;
        var namLen = (opts.names || options.names).length;
        
        if (opts instanceof Object && Object.keys(opts) && brkLen === namLen) {
            Object.assign(options, opts);
            return true;
        } else {
            return false;
        }
    };
    
})();