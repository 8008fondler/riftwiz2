var indexOfCI = function (arr, q) {// case-independent indexOf
	return arr.findIndex( 
		function (item) {
			return q.toLowerCase() === item.toLowerCase()
		}
	)
};
var cap = function (str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var cached_flattened_descriptions = new Map();

var get_flattened_desc = function (something){
    if (cached_flattened_descriptions.has(something))
        return cached_flattened_descriptions.get(something)
    
    let tmp = recursive_flattening(something,true);
    tmp = tmp.replace(/\_|\:|\]|\[|[\(\)\.\,\:]/g," ").replace(/\s+/g," ");
    cached_flattened_descriptions.set(something,tmp);
    //console.log(tmp);
    return tmp;
}

//var keys_excluded_from_flattening = ['label'];

var recursive_flattening = function(something, exclude_keys = false){
    let res = ' ';

    if (something === null || typeof something == "boolean")
        return res;
    
    if (Array.isArray(something)){
        for (i=0;i<something.length;i++)
            res += recursive_flattening(something[i]) + " "

        return res;
    }

    if (typeof something === 'object') {
        for (k in something){
            //if (keys_excluded_from_flattening.indexOf(k) === -1)
            //TODO: include some keys from tab_bonuses & tag_bonuses_pct
            if (false && !exclude_keys)
                res += k + " ";

            res += recursive_flattening(something[k]) + " ";
        }

        return res;
    }

    return '' + something;
}

var known_tags_stuff = {
	"fire" : {color:'#dc1b22',letter:'f'},
	"lightning" : {color:'#fbea57',letter:'l'},
	"ice" : {color:'#4ec1f4',letter:'i'},
	"nature" : {color:'#5dad5d',letter:'n'},
	"arcane" : {color:'#f06292',letter:'a'},
	"dark" : {color:'#9c27b0',letter:'d'},
	"holy" : {color:'#f6fe8d',letter:'h'},
	"sorcery" : {color:'#e91e63',letter:'s'},
	"conjuration" : {color:'#f36c60',letter:'c'},
	"enchantment" : {color:'#31a490',letter:'e'},
	"word" : {color:'#ffd54f',letter:'w'},
	"orb" : {color:'#f8a8b7',letter:'b'},
	"dragon" : {color:'#b0120a',letter:'r'},
	"translocation" : {color:'#ba68c8',letter:'t'},
    "metallic" : {color:'#666666',letter:'m'},
	"eye" : {color:'#ffffff',letter:'y'},
	"chaos" : {color:'#ffab4d',letter:'o'},
    "blood" : {color:'#ff0000',letter:'b'},
}

var tag_colors_orig = {//for descriptions
    "Physical": { color: "rgb(230, 210, 210)" },
    "Fire": { color: "rgb(229, 28, 35)" },
    "Lightning": { color: "rgb(255, 238, 88)" },
    "Ice": { color: "rgb(79, 195, 247)" },
    "Nature": { color: "rgb(114, 213, 114)" },
    "Arcane": { color: "rgb(240, 98, 146)" },
    "Dark": { color: "rgb(156, 39, 176)" },
    "Holy": { color: "rgb(246, 254, 141)" },
    "Sorcery": { color: "rgb(233, 30, 99)" },
    "Conjuration": { color: "rgb(243, 108, 96)" },
    "Enchantment": { color: "rgb(49, 164, 144)" },
    "Word": { color: "rgb(255, 213, 79)" },
    "Orb": { color: "rgb(248, 168, 183)" },
    "Dragon": { color: "rgb(176, 18, 10)" },
    "Translocation": { color: "rgb(186, 104, 200)" },
    "Undead": { color: "rgb(97, 97, 97)" },
    "Elemental": { color: "rgb(255, 235, 59)" },
    "Heal": { color: "rgb(66, 189, 66)" },
    "Acid": { color: "rgb(66, 189, 65)" },
    "Demon": { color: "rgb(240, 70, 70)" },
    "Spider": { color: "rgb(10, 126, 7)" },
    "Poison": { color: "rgb(66, 189, 65)" },
    "Living": { color: "rgb(174, 213, 129)" },
    "Construct": { color: "rgb(188, 170, 164)" },
    "Metallic": { color: "rgb(144, 156, 186)" },
    "Eye": { color: "rgb(255, 255, 255)" },
    "Glass": { color: "rgb(43, 175, 43)" },
    "Chaos": { color: "rgb(255, 171, 77)" },
    "Blood": { color: "rgb(134, 13, 7)" },
    "Tongue": { color: "rgb(236, 94, 149)" },
    "Slime": { color: "rgb(206, 220, 56)" },

    "COLOR_BLACK": { color: "rgb(0, 0, 0)" },
    "COLOR_ARTIFACT": { color: "rgb(252, 186, 3)" },
    "COLOR_CONSUMABLE": { color: "rgb(31, 255, 75)" },
    "COLOR_MANA": { color: "rgb(125, 125, 255)" },
    "COLOR_OMEGA": { color: "rgb(255, 217, 102)" },
    "COLOR_DAMAGE": { color: "rgb(215, 0, 0)" },
    "COLOR_CHARGES": { color: "rgb(255, 128, 0)" },
    "COLOR_RANGE": { color: "rgb(180, 100, 255)" },
    "COLOR_SHIELD": { color: "rgb(77, 253, 252)" },
}

var attr_colors_keys = {
	'damage': "COLOR_DAMAGE",
	'range': "COLOR_RANGE",
	'minion_health': "Conjuration",
	'minion_damage': "Conjuration",
	'breath_damage': "Conjuration",
	'minion_duration': "Conjuration",
	'minion_range': "COLOR_RANGE",
	'duration': "Enchantment",
	'max_charges': "COLOR_CHARGES",
	'radius': "Sorcery",
	'num_summons': "COLOR_CHARGES",
	'num_targets': "COLOR_CHARGES",
	'shields': "COLOR_SHIELD",
	'shot_cooldown': "Enchantment",
	'strikechance': "Sorcery",
	'cooldown': "Enchantment",
	'cascade_range': "COLOR_CHARGES",
}

var url = "/data_sources/";



var css = '', /* letter highlighting css */
head = document.head || document.getElementsByTagName('head')[0],
style = document.createElement('style');
head.appendChild(style);
style.type = 'text/css';

for (k in known_tags_stuff) {
	css += '.tag_name.' + k + ' .letter{color:' + (tag_colors_orig[cap(k)] ? tag_colors_orig[cap(k)].color : known_tags_stuff[k].color) + "}\r\n";
	css += '.tag_name.' + k + '.selected{color:' + (tag_colors_orig[cap(k)] ? tag_colors_orig[cap(k)].color : known_tags_stuff[k].color) + "}\r\n";
};
	
css += '.tag_name.no-conjuration .letter{color:' + known_tags_stuff['conjuration'].color + "}\r\n";
css += '.tag_name.conjuration-only .letter{color:' + known_tags_stuff['conjuration'].color + "}\r\n";

for (k in tag_colors_orig) {
	css += '.tag_name.' + k + ' {color:' + tag_colors_orig[k].color + "}\r\n";
    css += '.tag_name.' + k + ' .letter{color:' + tag_colors_orig[k].color + "}\r\n";
	css += '.tag_name.' + k + '.selected{color:' + tag_colors_orig[k].color + "}\r\n";
};

if (style.styleSheet){
	style.styleSheet.cssText = css;
} else {
	style.appendChild(document.createTextNode(css));
}



function init (jsons) {

	jsons.spells.sort(function(a, b) {
		if (a.level > b.level) return 1;
		if (a.level < b.level) return -1;
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	});
	jsons.skills.sort(function(a, b) {
		if (a.level > b.level) return 1;
		if (a.level < b.level) return -1;
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	});
	jsons.items.sort(function(a, b) {
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;		
		return 0;
	});
	
	
	new Vue({ // TODO(?): move vue part into a separate file
		el:"#app",
		data: {
			skills:jsons.skills,
			spells:jsons.spells,
			items:jsons.items,
			
			tags:window.known_tags_stuff,
			
			hovered_item: null,
			hovered_item_type: null,
			hovered_upgrade:null,
			
			selected_item: null,
			selected_item_type:null,
			
			tag_filters: [],
			
			is_search_input_in_focus:false,
			search_query: '',
		},
		mounted: function(){
			var _t=this;
			window.addEventListener('keydown', function(e) {
				_t.key_pressed(e);
			});
			
		},
		methods:{
			decorate_tag_name(name,letter_only) {
				var name = name.toLowerCase();
				
				if ((name=='no-conjuration' || name=='conjuration-only')) {
					name = 'conjuration';
				}
				
				var tag_data = this.tags[name];
				//TODO: make this work for single-letter tags from original tag list, or, better yet, fully switch to that list
                if (!tag_data) {
                    name = cap(name);

                    if (tag_colors_orig[name])
                        tag_data = {
                            color: tag_colors_orig[name],
                            letter: name[0]
                        };
                    else
					    return 'unknown tag';
				}

				var ind = name.indexOf(tag_data.letter);
				
				var res = name.split('');
				if (!letter_only) {
					res.splice(ind+1, 0, "</span>");
					res.splice(ind, 0, "<span class='letter'>");
					res = res.join('');
				} else {
					res = "<span class='letter'>" + res[ind] + "</span>";
				}
				
				return res;
			},
            decorate_desc_html(desc) {
                return desc.replace(/\[([^\]]*)\]/g,(match,group1)=>{
                    
                    let tmp = group1.split(":");
                    let txt = tag = tmp[0]

                    if (tmp.length>1)
                        tag = tmp[1];
                    
                    txt = txt.replace('_',' ');

                    if (attr_colors_keys[tag])
                        tag = attr_colors_keys[tag]

                    return '<span class="tag_name ' + cap(tag) + '">' + txt + '</span>';
                });
            },
			toggle_tag (e,name){
				if (typeof this.tags[name].selected == 'undefined') {
					Vue.set(this.tags[name],'selected',false);
				}
				
				this.tags[name].selected = !this.tags[name].selected;
			},
			key_pressed (e){
				var K = e.key;
				if (e.ctrlKey) return; // ignore ctrl+ shortcuts 
				
				if (K == 'Escape' || K == "Esc" || e.keyCode == 27) {
					for (tag in this.tags) {
						Vue.set(this.tags[tag],'selected',false);
					}
				}
				
				if (this.is_search_input_in_focus) return; // disable when search input is in focus
					
				for (name in this.tags) {
					if (this.tags[name].letter.toLowerCase() == K.toLowerCase()){
						this.toggle_tag(e,name)
					}
				}
			},
			hover_over(item,type){
				this.hovered_item = item;
				this.hovered_item_type = type;
			},
			hover_upgrade(upg){
				this.hovered_upgrade = upg;
			},
			hover_upgrade_out(){
				this.hovered_upgrade = null;
			},
			hover_out(){
				this.hovered_item = null;
				this.hovered_item_type = null;
			},
			toggle_item_select(item,type){
				if (this.selected_item == item) {
					this.selected_item = null;
					this.selected_item_type = null;
				} else {
					this.selected_item = item;
					this.selected_item_type = type;
				}
			},
			check_against_filters(){ // TODO:rework this stuff. It really needs a rework now.
				var _t=this;
				return {
					'spell':function(spell_data){
						for (k in _t.tags){
							if (_t.tags[k].selected && indexOfCI(spell_data.tags,k)===-1){
								return false;
							}
						}
						
						if(_t.search_regex) // TODO(?): check upgrades for a match too
							return _t.search_regex.test(spell_data.name) || _t.search_regex.test(spell_data.description) || _t.search_regex.test(get_flattened_desc(spell_data));
						
						return true;
					},
					'skill':function(skill_data){
					
						for (k in _t.tags){
							if (_t.tags[k].selected && indexOfCI(skill_data.tags,k)===-1){
								return false;
							}
						}
						
						if(_t.search_regex) // TODO(?): check conditions for a match too
                            return _t.search_regex.test(skill_data.name) || _t.search_regex.test(get_flattened_desc(skill_data));
							//return _t.search_regex.test(skill_data.name) || _t.search_regex.test(skill_data.applies_to);
                        
							
						return true;
					},
					'item':function(item_data){ // items conditions are || between eachother, then && if the "cj-only"/"non-cj" is present
                        //TODO: add beter filter interactions between selected spells & skills & items
						if (false && _t.selected_item && _t.selected_item_type == 'spell' && item_data.tags && item_data.tags.length) {

                            for (k in _t.tags){
                                if (_t.tags[k].selected && indexOfCI(item_data.tags,k)===-1){
                                    return false;
                                }
                            }
							
							return true;
						}
						
						if(_t.search_regex)
							return _t.search_regex.test(item_data.name) || _t.search_regex.test(item_data.description) || _t.search_regex.test(get_flattened_desc(item_data));
                        
							
						return true;
					}
				}
			}
		},
		computed: { // TODO(?): separate these: make more than one selectable, make more than one type selectable (as a feature to have some other filtering options)- decide on how will it look and what will this multi-selection do
			displayed_item: function() {
				return null || this.hovered_item || this.selected_item;
			},
			displayed_item_type: function() {
				return null || this.hovered_item_type || this.selected_item_type;
			},
			search_regex: function() {
				var query = this.search_query.trim();
				if (query === '') return false;
				var regex = false;
				try {
					regex = new RegExp(query, 'i');
				} catch (e) {
					regex = null;
				}
				return regex;
				
				
			}
		},
	});
};


Promise.all([ // bye-bye IE11;
	fetch(url + 'rw2_skills.json').then(response => response.json()),
	fetch(url + 'rw2_items.json').then(response => response.json()),
	fetch(url + 'rw2_spells.json').then(response => response.json()),
]).then(([skills, items,spells]) => init({skills:skills, items:items,spells:spells}));