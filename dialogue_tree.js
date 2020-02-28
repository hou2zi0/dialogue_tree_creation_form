class Dialogue {
    // Class setup
    constructor(container_id = "dialogue") {
      this.container = this.getContainer(container_id);
      this.version = this.helpers.version();
      this.helpers.setUp(this.container);
    }

    getContainer(container_id) {
        let container;
        try {
            console.log(document.getElementById(container_id));
            container = document.getElementById(container_id);
        } catch (error) {
            console.log(error);
        }

        if (container == null) {
            try {
                throw {
                    name: "ContainerNotFound",
                    message: "Dialogue container ID not found. Please check for existence and spelling.",
                    id: { 
                        "container_id": container_id,
                        "available_ids": this.helpers.getAllIdsFromDocument()
                    }
                  };
              }
              catch (e) {
                console.error(e.name, e.id );
                console.warn(e.message);                
              }
        }

        return container;
    }

    test(){
        return "1234";
    }
    // Functionality
    addNode(event){
            const uuid = this.helpers.createUUID();
            const newNode = document.createElement("div");
            newNode.setAttribute('class', 'node');
            newNode.setAttribute('id', uuid);
            newNode.innerHTML = `
            <p><strong>UUID</strong>: ${uuid}</p>
            <p><label for="tag">Tag:</label> <input type="text" name="tag" class="tag" value="${this.helpers.generateNameTag()}"></p>
            <p><label for="text">Text:</label><br><textarea name="text" class="text"></textarea></p>
            `;

            const button = document.createElement("BUTTON");
            button.textContent = "Add option node"
            button.setAttribute('class', 'add_button');
            button.addEventListener('click', (event) => {
                this.addOption(event);
            });
            newNode.appendChild(button);
            
            newNode.getElementsByClassName('tag')[0].addEventListener('change', this.helpers.updateSelects);

            event.srcElement.parentNode.insertBefore(newNode, event.srcElement);
            this.helpers.updateSelects();
    }

    addOption(event){
            const uuid = this.helpers.createUUID();
            const newNode = document.createElement("div");
            newNode.setAttribute('class', 'option');
            newNode.setAttribute('id', uuid);
            newNode.innerHTML = `
            <p><strong>UUID</strong>: ${uuid}</p>
            <p><label for="option_tag">Tag:</label> <input type="text" name="option_tag" class="option_tag" value="${this.helpers.generateNameTag()}"></p>
            <p><label for="text">Text:</label><br><textarea name="text" class="text"></textarea></p>
            <label for="DestinationID">Destination:</label>
            <select id="${uuid}__DestinationID" name="DestinationID" class="destination_node_select">
                <option value="-1" selected>Exit</option>
                ${this.helpers.getAllNodeIDs().map((id) => {
                    return `<option value="${id}">${this.helpers.getNameTag(id)}</option>`
                })}
            </select>
            <button>Delete</button>
            `;

            newNode.getElementsByTagName('button')[0].addEventListener('click', function(event){
                console.log(this.parentNode.remove());    
            });
            event.srcElement.parentNode.insertBefore(newNode, event.srcElement);
    }

//<option value="volvo">Volvo</option>
    // Helper functions
     helpers = {
        "getAllIdsFromDocument": function(){
            return Array.from(document.getElementsByTagName("*")).filter(el => {
                return el.id;
            }).map(el => {
                return el.id;
            });
        },
        "version": function(){
            return "0.0.1";
        },
        "setUp": (container) => {
            const button = document.createElement("BUTTON");
            button.textContent = "Add dialogue node"
            button.setAttribute('class', 'add_button');
            button.addEventListener('click', (event) => {
                this.addNode(event);
            });
            container.appendChild(button);
            
            const br = document.createElement("hr");
            container.appendChild(br);

            const downloadButton = document.createElement("BUTTON");
            downloadButton.textContent = "Download JSON.file"
            downloadButton.setAttribute('class', 'add_button');
            downloadButton.addEventListener('click', (event) => {
                const filename = document.getElementById("dialogue_tag").value.replace(/[ .,;:!?#\(\)\[\]*~+]/g,'_');
                const data = this.helpers.aggregateJSON();
                this.helpers.prepareDownload(data, filename)
            });
            container.appendChild(downloadButton);

            const metadata = document.createElement("DIV");
            metadata.setAttribute('id', 'metadata');
            metadata.dataset.id = this.helpers.createUUID();
            metadata.innerHTML = `
                <p><strong>Author</strong> <input type="text" id="dialogue_author" value="Jane Doe"></p>
                <p><strong>Tag</strong> <input type="text" id="dialogue_tag" value="${this.helpers.generateNameTag()} dialogue"></p>
            `;
            container.insertBefore(metadata, container.firstChild);
            
        },
        "createUUID": function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
               var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
               return v.toString(16);
            });
         },
         "getAllNodeIDs": function(){
            const nodeIds = Array.from(document.getElementsByClassName("node")).map(n => {return n.id});
            return nodeIds;
         },
         "getNameTag": function(id){
             const node = document.getElementById(id);
             if (node != null){
                return node.getElementsByClassName("tag")[0].value;
             } else {
                 return "node not found";
             }
         },
         "generateNameTag": function(){
            const adjectives = ['aback','abaft','abandoned','abashed','aberrant','abhorrent','abiding','abject','ablaze','able','abnormal','aboriginal','abortive','abounding','abrasive','abrupt','absent','absorbed','absorbing','abstracted','absurd','abundant','abusive','acceptable','accessible','accidental','accurate','acid','acidic','acoustic','acrid','adamant','adaptable','addicted','adhesive','adjoining','adorable','adventurous','afraid','aggressive','agonizing','agreeable','ahead','ajar','alert','alike','alive','alleged','alluring','aloof','amazing','ambiguous','ambitious','amuck','amused','amusing','ancient','angry','animated','annoyed','annoying','anxious','apathetic','aquatic','aromatic','arrogant','ashamed','aspiring','assorted','astonishing','attractive','auspicious','automatic','available','average','aware','awesome','axiomatic','bad','barbarous','bashful','bawdy','beautiful','befitting','belligerent','beneficial','bent','berserk','bewildered','big','billowy','bite-sized','bitter','bizarre','black','black-and-white','bloody','blue','blue-eyed','blushing','boiling','boorish','bored','boring','bouncy','boundless','brainy','brash','brave','brawny','breakable','breezy','brief','bright','broad','broken','brown','bumpy','burly','bustling','busy','cagey','calculating','callous','calm','capable','capricious','careful','careless','caring','cautious','ceaseless','certain','changeable','charming','cheap','cheerful','chemical','chief','childlike','chilly','chivalrous','chubby','chunky','clammy','classy','clean','clear','clever','cloistered','cloudy','closed','clumsy','cluttered','coherent','cold','colorful','colossal','combative','comfortable','common','complete','complex','concerned','condemned','confused','conscious','cooing','cool','cooperative','coordinated','courageous','cowardly','crabby','craven','crazy','creepy','crooked','crowded','cruel','cuddly','cultured','cumbersome','curious','curly','curved','curvy','cut','cute','cynical','daffy','daily','damaged','damaging','damp','dangerous','dapper','dark','dashing','dazzling','dead','deadpan','deafening','dear','debonair','decisive','decorous','deep','deeply','defeated','defective','defiant','delicate','delicious','delightful','demonic','delirious','dependent','depressed','deranged','descriptive','deserted','detailed','determined','devilish','didactic','different','difficult','diligent','direful','dirty','disagreeable','disastrous','discreet','disgusted','disgusting','disillusioned','dispensable','distinct','disturbed','divergent','dizzy','domineering','doubtful','drab','draconian','dramatic','dreary','drunk','dry','dull','dusty','dynamic','dysfunctional','eager','early','earsplitting','earthy','easy','eatable','economic','educated','efficacious','efficient','elastic','elated','elderly','electric','elegant','elfin','elite','embarrassed','eminent','empty','enchanted','enchanting','encouraging','endurable','energetic','enormous','entertaining','enthusiastic','envious','equable','equal','erect','erratic','ethereal','evanescent','evasive','even','excellent','excited','exciting','exclusive','exotic','expensive','extra-large','extra-small','exuberant','exultant','fabulous','faded','faint','fair','faithful','fallacious','false','familiar','famous','fanatical','fancy','fantastic','far','far-flung','fascinated','fast','fat','faulty','fearful','fearless','feeble','feigned','female','fertile','festive','few','fierce','filthy','fine','finicky','first','fixed','flagrant','flaky','flashy','flat','flawless','flimsy','flippant','flowery','fluffy','fluttering','foamy','foolish','foregoing','forgetful','fortunate','frail','fragile','frantic','free','freezing','frequent','fresh','fretful','friendly','frightened','frightening','full','fumbling','functional','funny','furry','furtive','future','futuristic','fuzzy','gabby','gainful','gamy','gaping','garrulous','gaudy','general','gentle','giant','giddy','gifted','gigantic','glamorous','gleaming','glib','glistening','glorious','glossy','godly','good','goofy','gorgeous','graceful','grandiose','grateful','gratis','gray','greasy','great','greedy','green','grey','grieving','groovy','grotesque','grouchy','grubby','gruesome','grumpy','guarded','guiltless','gullible','gusty','guttural','habitual','half','hallowed','halting','handsome','handy','hanging','hapless','happy','hard','hard-to-find','harmonious','harsh','hateful','heady','healthy','heartbreaking','heavenly','heavy','hellish','helpful','helpless','hesitant','hideous','high','highfalutin','high-pitched','hilarious','hissing','historical','holistic','hollow','homeless','homely','honorable','horrible','hospitable','hot','huge','hulking','humdrum','humorous','hungry','hurried','hurt','hushed','husky','hypnotic','hysterical','icky','icy','idiotic','ignorant','ill','illegal','ill-fated','ill-informed','illustrious','imaginary','immense','imminent','impartial','imperfect','impolite','important','imported','impossible','incandescent','incompetent','inconclusive','industrious','incredible','inexpensive','infamous','innate','innocent','inquisitive','insidious','instinctive','intelligent','interesting','internal','invincible','irate','irritating','itchy','jaded','jagged','jazzy','jealous','jittery','jobless','jolly','joyous','judicious','juicy','jumbled','jumpy','juvenile','keen','kind','kindhearted','kindly','knotty','knowing','knowledgeable','known','labored','lackadaisical','lacking','lame','lamentable','languid','large','last','late','laughable','lavish','lazy','lean','learned','left','legal','lethal','level','lewd','light','like','likeable','limping','literate','little','lively','living','lonely','long','longing','long-term','loose','lopsided','loud','loutish','lovely','loving','low','lowly','lucky','ludicrous','lumpy','lush','luxuriant','lying','lyrical','macabre','macho','maddening','madly','magenta','magical','magnificent','majestic','makeshift','male','malicious','mammoth','maniacal','many','marked','massive','married','marvelous','material','materialistic','mature','mean','measly','meaty','medical','meek','mellow','melodic','melted','merciful','mere','messy','mighty','military','milky','mindless','miniature','minor','miscreant','misty','mixed','moaning','modern','moldy','momentous','motionless','mountainous','muddled','mundane','murky','mushy','mute','mysterious','naive','nappy','narrow','nasty','natural','naughty','nauseating','near','neat','nebulous','necessary','needless','needy','neighborly','nervous','new','next','nice','nifty','nimble','nippy','noiseless','noisy','nonchalant','nondescript','nonstop','normal','nostalgic','nosy','noxious','numberless','numerous','nutritious','nutty','oafish','obedient','obeisant','obese','obnoxious','obscene','obsequious','observant','obsolete','obtainable','oceanic','odd','offbeat','old','old-fashioned','omniscient','onerous','open','opposite','optimal','orange','ordinary','organic','ossified','outgoing','outrageous','outstanding','oval','overconfident','overjoyed','overrated','overt','overwrought','painful','painstaking','pale','paltry','panicky','panoramic','parallel','parched','parsimonious','past','pastoral','pathetic','peaceful','penitent','perfect','periodic','permissible','perpetual','petite','phobic','physical','picayune','pink','piquant','placid','plain','plant','plastic','plausible','pleasant','plucky','pointless','poised','polite','political','poor','possessive','possible','powerful','precious','premium','present','pretty','previous','pricey','prickly','private','probable','productive','profuse','protective','proud','psychedelic','psychotic','public','puffy','pumped','puny','purple','purring','pushy','puzzled','puzzling','quaint','quarrelsome','questionable','quick','quiet','quirky','quixotic','quizzical','rabid','racial','ragged','rainy','rambunctious','rampant','rapid','rare','raspy','ratty','ready','real','rebel','receptive','recondite','red','redundant','reflective','regular','relieved','remarkable','reminiscent','repulsive','resolute','resonant','responsible','rhetorical','rich','right','righteous','rightful','rigid','ripe','ritzy','roasted','robust','romantic','roomy','rotten','rough','round','royal','ruddy','rude','rural','rustic','ruthless','sable','sad','safe','salty','same','sassy','satisfying','savory','scandalous','scarce','scared','scary','scattered','scientific','scintillating','scrawny','screeching','second','second-hand','secret','secretive','sedate','seemly','selective','selfish','separate','serious','shaggy','shaky','shallow','sharp','shiny','shivering','shocking','short','shrill','shut','shy','sick','silent','silky','silly','simple','simplistic','sincere','skillful','skinny','sleepy','slim','slimy','slippery','sloppy','slow','small','smart','smelly','smiling','smoggy','smooth','sneaky','snobbish','snotty','soft','soggy','solid','somber','sophisticated','sordid','sore','sour','sparkling','special','spectacular','spicy','spiffy','spiky','spiritual','spiteful','splendid','spooky','spotless','spotted','spotty','spurious','squalid','square','squealing','squeamish','staking','stale','standing','statuesque','steadfast','steady','steep','stereotyped','sticky','stiff','stimulating','stingy','stormy','straight','strange','striped','strong','stupendous','sturdy','subdued','subsequent','substantial','successful','succinct','sudden','sulky','super','superb','superficial','supreme','swanky','sweet','sweltering','swift','symptomatic','synonymous','taboo','tacit','tacky','talented','tall','tame','tan','tangible','tangy','tart','tasteful','tasteless','tasty','tawdry','tearful','tedious','teeny','teeny-tiny','telling','temporary','ten','tender','tense','tenuous','terrific','tested','testy','thankful','therapeutic','thick','thin','thinkable','third','thirsty','thoughtful','thoughtless','threatening','thundering','tidy','tight','tightfisted','tiny','tired','tiresome','toothsome','torpid','tough','towering','tranquil','trashy','tremendous','tricky','trite','troubled','truculent','true','truthful','typical','ubiquitous','ultra','unable','unaccountable','unadvised','unarmed','unbecoming','unbiased','uncovered','understood','undesirable','unequal','unequaled','uneven','unhealthy','uninterested','unique','unkempt','unknown','unnatural','unruly','unsightly','unsuitable','untidy','unused','unusual','unwieldy','unwritten','upbeat','uppity','upset','uptight','used','useful','useless','utopian','vacuous','vagabond','vague','valuable','various','vast','vengeful','venomous','verdant','versed','victorious','vigorous','violent','violet','vivacious','voiceless','volatile','voracious','vulgar','wacky','waggish','waiting','wakeful','wandering','wanting','warlike','warm','wary','wasteful','watery','weak','wealthy','weary','well-groomed','well-made','well-off','well-to-do','wet','whimsical','whispering','white','whole','wholesale','wicked','wide','wide-eyed','wiggly','wild','willing','windy','wiry','wise','wistful','witty','woebegone','womanly','wonderful','wooden','woozy','workable','worried','worthless','wrathful','wretched','wrong','wry','yellow','yielding','young','youthful','yummy','zany','zealous','zesty','zippy','zonked',];
            const animals = [ "Aardvark", "Albatross", "Alligator", "Alpaca", "Ant", "Anteater", "Antelope", "Ape", "Armadillo", "Donkey", "Baboon", "Badger", "Barracuda", "Bat", "Bear", "Beaver", "Bee", "Bison", "Boar", "Buffalo", "Butterfly", "Camel", "Capybara", "Caribou", "Cassowary", "Cat", "Caterpillar", "Cattle", "Chamois", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Chough", "Clam", "Cobra", "Cockroach", "Cod", "Cormorant", "Coyote", "Crab", "Crane", "Crocodile", "Crow", "Curlew", "Deer", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Dotterel", "Dove", "Dragonfly", "Duck", "Dugong", "Dunlin", "Eagle", "Echidna", "Eel", "Eland", "Elephant", "Elk", "Emu", "Falcon", "Ferret", "Finch", "Fish", "Flamingo", "Fly", "Fox", "Frog", "Gaur", "Gazelle", "Gerbil", "Giraffe", "Gnat", "Gnu", "Goat", "Goldfinch", "Goldfish", "Goose", "Gorilla", "Goshawk", "Grasshopper", "Grouse", "Guanaco", "Gull", "Hamster", "Hare", "Hawk", "Hedgehog", "Heron", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Hyena", "Ibex", "Ibis", "Jackal", "Jaguar", "Jay", "Jellyfish", "Kangaroo", "Kingfisher", "Koala", "Kookabura", "Kouprey", "Kudu", "Lapwing", "Lark", "Lemur", "Leopard", "Lion", "Llama", "Lobster", "Locust", "Loris", "Louse", "Lyrebird", "Magpie", "Mallard", "Manatee", "Mandrill", "Mantis", "Marten", "Meerkat", "Mink", "Mole", "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Narwhal", "Newt", "Nightingale", "Octopus", "Okapi", "Opossum", "Oryx", "Ostrich", "Otter", "Owl", "Oyster", "Panther", "Parrot", "Partridge", "Peafowl", "Pelican", "Penguin", "Pheasant", "Pig", "Pigeon", "Pony", "Porcupine", "Porpoise", "Quail", "Quelea", "Quetzal", "Rabbit", "Raccoon", "Rail", "Ram", "Rat", "Raven", "Red deer", "Red panda", "Reindeer", "Rhinoceros", "Rook", "Salamander", "Salmon", "Sand Dollar", "Sandpiper", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Sheep", "Shrew", "Skunk", "Snail", "Snake", "Sparrow", "Spider", "Spoonbill", "Squid", "Squirrel", "Starling", "Stingray", "Stinkbug", "Stork", "Swallow", "Swan", "Tapir", "Tarsier", "Termite", "Tiger", "Toad", "Trout", "Turkey", "Turtle", "Viper", "Vulture", "Wallaby", "Walrus", "Wasp", "Weasel", "Whale", "Wildcat", "Wolf", "Wolverine", "Wombat", "Woodcock", "Woodpecker", "Worm", "Wren", "Yak", "Zebra" ];

            const a = adjectives[Math.floor(Math.random() * adjectives.length)];
            const b = adjectives[Math.floor(Math.random() * adjectives.length)];
            const c = animals[Math.floor(Math.random() * animals.length)];
            return `${a} ${b} ${c.toLowerCase()}`
         },
         "updateSelects": () => {
            const destination_node_select_options = this.helpers.getAllNodeIDs().map((id) => {
                return `<option value="${id}">${this.helpers.getNameTag(id)}</option>`
            });
            Array.from(document.getElementsByClassName("destination_node_select")).forEach((el) => {
                const selectedOption = el.selectedOptions[0].value; 
                el.innerHTML = `<option value="-1">Exit</option>`+destination_node_select_options;
                Array.from(el.options).forEach((option) => {
                    if (option.value == selectedOption){
                        option.selected = true;
                    }
                })
            })
        },
         "prepareDownload": function (data, filename) {
            const content = JSON.stringify(data);
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        },
        "aggregateJSON": function(){
            const date = new Date();

            const nodes = Array.from(document.getElementsByClassName("node")).map((node, index) => {
                const options = Array.from(node.getElementsByClassName("option")).map((option, index) => {
                    return {
                        "id": option.id,
                        "index": index,
                        "tag": option.getElementsByClassName("option_tag")[0].value,
                        "text": option.getElementsByClassName("text")[0].value,
                        "destination": {
                            "id": option.getElementsByClassName("destination_node_select")[0].selectedOptions[0].value,
                            "tag": option.getElementsByClassName("destination_node_select")[0].selectedOptions[0].label
                        }
                    };
                })

                return {
                    "id": node.id,
                    "index": index,
                    "tag": node.getElementsByClassName("tag")[0].value,
                    "text": node.getElementsByClassName("text")[0].value,
                    "options": options
                };
            })

            return {
                "id": document.getElementById('metadata').dataset.id,
                "tag": document.getElementById('dialogue_tag').value,
                "author": document.getElementById('dialogue_author').value,
                "date": date.toJSON(),
                "nodes": nodes
            };
        }
    };
    
  }

const dialogue = new Dialogue();