## this script should be run from the inside of rift wizard 2 folder which contains original game files

from Spells import *
from Spells import make_player_spells

from Upgrades import *
from Upgrades import make_player_skills

from Equipment import *

import json
import re

import pprint
pp = pprint.PrettyPrinter(depth=4)

path_spells = "rw2_spells.json"
path_skills = "rw2_skills.json"
path_items = "rw2_items.json"

rep = {
		"'": '"',
		"<": '"<',
		">": '>"',
		"True":"true",
		"False":"false",
		"None": "null"
}

pattern = re.compile("|".join(rep.keys()))

spells = make_player_spells()
spells_list = []

#all_the_keys = {}
#first_keys = {}
#flag = True

for spell in spells:
			'''
			ks = spell.__dict__.keys()
			for k in ks:
				all_the_keys[k] = k
				if (flag):
					first_keys[k] = k
			flag = False
			'''

			data = {}
			data['name'] = spell.name
			#data['mana_cost'] = spell.mana_cost
			#data['cool_down'] = spell.cool_down
			data['hp_cost'] = spell.hp_cost
			data['requires_los'] = spell.requires_los
			#data['added_by_buff'] = spell.added_by_buff
			#data['item'] = spell.item
			#data['asset'] = spell.asset
			#data['prereqs'] = spell.prereqs
			data['level'] = spell.level
			data['description'] = spell.description
			if (spell.get_description):
				data['description'] = spell.get_description()
			#data['caster'] = spell.caster
			#data['owner'] = spell.owner
			#data['statholder'] = spell.statholder
			data['melee'] = spell.melee
			#data['show_tt'] = spell.show_tt
			data['quick_cast'] = spell.quick_cast
			data['cast_on_walls'] = spell.cast_on_walls
			data['range'] = spell.range
			data['max_charges'] = spell.max_charges
			data['can_target_self'] = spell.can_target_self
			data['can_target_empty'] = spell.can_target_empty
			data['must_target_walkable'] = spell.must_target_walkable
			data['must_target_empty'] = spell.must_target_empty
			data['target_allies'] = spell.target_allies
			data['target_empty'] = spell.target_empty
			#data['diag_range'] = spell.diag_range
			#data['animate'] = spell.animate

			data['tags'] = []
			for tag in spell.tags:
				data['tags'].append(tag.name)
				#color
				#asset
			
			data['stats'] = []
			for stat in spell.stats:
				data['stats'].append(stat)

			data['upgrades'] = []
			
			#print(spell.upgrades)
			for upg in spell.upgrades:
				#print(upg)
				#print (spell.upgrades[upg])
				#print (len(spell.upgrades[upg]))

				u = {}
				u['label'] = upg
				#print (type(spell.upgrades[upg]))

				if(type(spell.upgrades[upg]) is tuple):
					if (len(spell.upgrades[upg])>0):
						u['value'] = spell.upgrades[upg][0]

					if (len(spell.upgrades[upg])>1):
						u['cost'] = spell.upgrades[upg][1]

					if (len(spell.upgrades[upg])>2):
						u['name'] = spell.upgrades[upg][2]

					if (len(spell.upgrades[upg])>3):
						u['description'] = spell.upgrades[upg][3]
				else:
					u['cost'] = 1
					u['value'] = spell.upgrades[upg]

				data['upgrades'].append(u)
			
			spells_list.append(data)
			
with open(path_spells, "w") as outfile:
   outfile.write(json.dumps(spells_list, indent=4))


skills = make_player_skills()
skills_list = []
#all_the_keys = {}
#first_keys = {}
#flag = True

for skill in skills:
	'''
	ks = skill.__dict__.keys()
	for k in ks:
		all_the_keys[k] = k
		if (flag):
			first_keys[k] = k
	flag = False
	'''
		#print ("data['%s'] = skill.%s" % (k,k))

	data = {}
	data['description'] = skill.description
	if (skill.get_description):
		data['description'] = skill.get_description()
	
	#data['owner_triggers'] = skill.owner_triggers
	#data['global_triggers'] = skill.global_triggers
	#data['turns_left'] = skill.turns_left
	#data['color'] = skill.color
	#data['asset'] = skill.asset
	#data['resists'] = skill.resists
	#data['conversions'] = skill.conversions
	#data['spell_conversions'] = skill.spell_conversions
	data['spells'] = []#skill.spells
	for s in skill.spells:
		data['spells'].append(s.name)
		#data.append(s)

	#data['stack_type'] = skill.stack_type
	#data['owner'] = skill.owner
	#data['applied'] = skill.applied
	data['name'] = skill.name

	#data['spell_bonuses'] = []#skill.spell_bonuses
	#for s in skill.spell_bonuses:
	#	data['spell_bonuses'].append(s)

	#data['global_bonuses'] = []#skill.global_bonuses
	#for s in skill.global_bonuses:
	#	data['global_bonuses'].append(s)

	data['tag_bonuses'] = []#skill.tag_bonuses
	for tag in skill.tag_bonuses:
		data['tag_bonuses'].append({tag.name : skill.tag_bonuses[tag]})

	data['spell_bonuses_pct'] = []#skill.spell_bonuses_pct
	for s in skill.spell_bonuses_pct:
		data['spell_bonuses_pct'].append(s)

	data['global_bonuses_pct'] = []#skill.global_bonuses_pct
	for s in skill.global_bonuses_pct:
		data['global_bonuses_pct'].append(s)

	data['tag_bonuses_pct'] = []#skill.tag_bonuses_pct
	for tag in skill.tag_bonuses_pct:
		data['tag_bonuses_pct'].append({tag.name : skill.tag_bonuses_pct[tag]})
	
	#data['buff_type'] = skill.buff_type
	#data['show_effect'] = skill.show_effect
	#data['transform_asset_name'] = skill.transform_asset_name
	
	data['tags'] = []#skill.tags
	for tag in skill.tags:
		data['tags'].append(tag.name)

	data['level'] = skill.level
	#data['prereq'] = skill.prereq
	#data['keystone'] = skill.keystone
	#data['max_stacks'] = skill.max_stacks
	#data['shrine_name'] = skill.shrine_name
	if (hasattr(skill,"damage")):
		data['damage'] = skill.damage
	
	if (hasattr(skill,"radius")):
		data['radius'] = skill.radius

	if (hasattr(skill,"minion_health")):
		data['minion_health'] = skill.minion_health

	if (hasattr(skill,"minion_damage")):
		data['minion_damage'] = skill.minion_damage
		
	if (hasattr(skill,"num_summons")):
		data['num_summons'] = skill.num_summons
	#data['guard_name'] = skill.guard_name
	#data['counter_max'] = skill.counter_max
	#data['counter'] = skill.counter
	#data['farmiliar'] = skill.farmiliar
	if (hasattr(skill,"minoin_range")):
		data['minoin_range'] = skill.minoin_range

	#data['casts'] = skill.casts
	#data['heal'] = skill.heal
	if (hasattr(skill,"minion_range")):
		data['minion_range'] = skill.minion_range
	
	if (hasattr(skill,"minion_duration")):
		data['minion_duration'] = skill.minion_duration
	#data['shields'] = skill.shields
	#data['cast_last'] = skill.cast_last
	
	if (hasattr(skill,"duration")):
		data['duration'] = skill.duration

	if (hasattr(skill,"num_targets")):
		data['num_targets'] = skill.num_targets
	
	#data['hh_name'] = skill.hh_name
	#data['fire_triggered'] = skill.fire_triggered
	#data['light_triggered'] = skill.light_triggered
	#data['phys_triggered'] = skill.phys_triggered
	#data['toadblood'] = skill.toadblood
	if (hasattr(skill,"charges")):
		data['charges'] = skill.charges
	#data['fire_victims'] = skill.fire_victims
	#data['dark_victims'] = skill.dark_victims
	#data['blackfire_victims'] = skill.blackfire_victims
	#data['serpent'] = skill.serpent
	#data['prev_spell'] = skill.prev_spell
	#data['idle_counter'] = skill.idle_counter
	#data['refund_counter'] = skill.refund_counter
	#data['copying'] = skill.copying
	#data['bonus'] = skill.bonus
	
	#data['fire'] = skill.fire
	#data['lightning'] = skill.lightning
	#data['physical'] = skill.physical
	#data['threshold'] = skill.threshold
	skills_list.append(data)

#pp.pprint(skills_list)

'''
for k in all_the_keys:
	#print ("data['%s'] = skill.%s" % (k,k))
	if (k not in first_keys):
		print ("data['%s'] = skill.%s" % (k,k))
'''

with open(path_skills, "w") as outfile:
   outfile.write(json.dumps(skills_list, indent=4))



#ITEM_SLOT_STAFF = 0
#ITEM_SLOT_ROBE = 1
#ITEM_SLOT_HEAD = 2
#ITEM_SLOT_GLOVES = 3
#ITEM_SLOT_BOOTS = 4
#ITEM_SLOT_AMULET = 5
slots = ["staff","robe","head","gloves","boots","trinket"]

items_list = []
#all_the_keys = {}


for item in all_items:
		item = item()
		'''
		ks = item.__dict__.keys()
		for k in ks:
			all_the_keys[k] = k
		'''
		data = {}
		data['slot'] = slots[item.slot]
		#data['level'] = item.level
		#data['asset_name'] = item.asset_name
		#data['recolor_primary'] = item.recolor_primary
		#data['recolor_secondary'] = item.recolor_secondary
		if (item.description is None):
			continue # because fk it thats why

		data['description'] = item.description
			

		#data['owner_triggers'] = item.owner_triggers
		#data['global_triggers'] = item.global_triggers
		#data['turns_left'] = item.turns_left
		#data['color'] = item.color
		#data['asset'] = item.asset
		
		#data['resists'] = item.resists
		#data['conversions'] = item.conversions

		#data['spell_conversions'] = item.spell_conversions
		#data['spells'] = item.spells
		#data['stack_type'] = item.stack_type
		#data['owner'] = item.owner
		#data['applied'] = item.applied
		if (hasattr(item,'name')):
			data['name'] = item.name
		else:
			continue

		#data['spell_bonuses'] = item.spell_bonuses
		#data['global_bonuses'] = item.global_bonuses
		#data['tag_bonuses'] = item.tag_bonuses
		#data['spell_bonuses_pct'] = item.spell_bonuses_pct
		#data['global_bonuses_pct'] = item.global_bonuses_pct
		#data['tag_bonuses_pct'] = item.tag_bonuses_pct

		#data['buff_type'] = item.buff_type
		#data['show_effect'] = item.show_effect
		#data['transform_asset_name'] = item.transform_asset_name
		
		if (hasattr(item,'tag') and item.tag is not None):
			data['tag'] = item.tag.name

		#data['prereq'] = item.prereq

		if (hasattr(item,'tags')):
			data['tags'] = []#skill.tags
			for tag in item.tags:
				data['tags'].append(tag.name)
		#data['charge'] = item.charge
		#data['minion_duration'] = item.minion_duration
		#data['counter_max'] = item.counter_max
		#data['spell'] = item.spell
		#data['counter'] = item.counter
		#data['monster'] = item.monster
		#data['monster_name'] = item.monster_name
		#data['duration'] = item.duration
		#data['num_targets'] = item.num_targets
		#data['radius'] = item.radius
		#data['ice_victims'] = item.ice_victims
		#data['dark_victims'] = item.dark_victims
		#data['blackice_victims'] = item.blackice_victims
		#data['tag1'] = item.tag1
		#data['tag2'] = item.tag2
		if (hasattr(item,'bonus')):
			data['bonus'] = item.bonus
		#data['buff_duration'] = item.buff_duration
		#data['minor_summon'] = item.minor_summon
		#data['minor_summon_name'] = item.minor_summon_name
		#data['num_minor_summons'] = item.num_minor_summons
		#data['major_summon'] = item.major_summon
		#data['major_summon_name'] = item.major_summon_name
		#data['num_major_summons'] = item.num_major_summons
		#data['last_pos'] = item.last_pos
		#data['charges'] = item.charges
		#data['spawn_fn'] = item.spawn_fn
		#data['steps'] = item.steps
		#data['damage'] = item.damage
		#data['forced_stat_tup'] = item.forced_stat_tup
		#data['forced_tag_tup'] = item.forced_tag_tup
		#data['dtype'] = item.dtype
		#data['boss_type'] = item.boss_type
		#data['buff_t'] = item.buff_t
		#data['cool_down'] = item.cool_down
		#data['cur_cooldown'] = item.cur_cooldown
		#data['visual_tag'] = item.visual_tag
			
		items_list.append(data)



'''	
for k in all_the_keys:
	print ("data['%s'] = item.%s" % (k,k))
'''

with open(path_items, "w") as outfile:
   outfile.write(json.dumps(items_list, indent=4))