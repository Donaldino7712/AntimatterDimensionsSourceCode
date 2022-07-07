import { GameDatabase } from "../game-database";

GameDatabase.reality.automator = {
  categoryNames: [
    "Time Studies",
    "Event Triggers",
    "Alter Settings",
    "Information",
    "Script Flow",
  ],
  commands: [
    {
      id: 0,
      isUnlocked: () => true,
      keyword: "STUDIES RESPEC",
      category: 0,
      syntax: `<b>studies respec</b>`,
      description: `This command turns on the respec option on to respec your Time Studies on the next manual or
        automatic Eternity. Note that this does not actually perform an Eternity on its own; make sure to eventually
        follow it up with an ETERNITY command or ensure your Autobuyer is on.`,
      examples: [
        `studies respec`,
      ]
    },
    {
      id: 1,
      isUnlocked: () => true,
      keyword: "STUDIES LOAD",
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>load id</b> <u>selector</u><br>
        <b>studies</b> [nowait] <b>load name</b> <u>name</u>`,
      description: `Loads a Time Study preset, as if you had clicked on the button in the Time Study tab.`,
      sections: [
        {
          name: "INPUTS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If present, the Automator will purchase as many studies as possible before continuing onward. By default
                (ie. without "nowait") this command will repeat this line indefinitely until all of the studies in the
                preset are bought; this may cause the Automator to get stuck indefinitely if you are not careful.
              `
            },
            {
              header: "<i>selector</i>",
              description: `
                Finds and loads the specified Time Study preset by its slot number. This is numbered one through six,
                ordered from left to right.`
            },
            {
              header: "<i>name</i>",
              description: "Finds and loads the specified Time Study preset by its given name. This is case-sensitive."
            },
          ]
        }
      ],
      examples: [
        `studies load id 2`,
        `studies load name ANTI`,
        `studies nowait load name dil`,
      ]
    },
    {
      id: 2,
      isUnlocked: () => true,
      keyword: "STUDIES PURCHASE",
      category: 0,
      syntax: `<b>studies</b> [nowait] <b>purchase <u>study_list</u></b>`,
      description: "Purchase Time Studies specified from a list formatted like a Tree export.",
      sections: [
        {
          name: "INPUTS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If present, the Automator will purchase as many studies as possible before continuing onward. By default
                (ie. without "nowait") this command will repeat this line indefinitely until all of the studies in the
                preset are bought; this may cause the Automator to get stuck indefinitely if you are not careful.
              `
            },
            {
              header: "<i>study_list</i>",
              description: `
              The Time Study list here has more flexibility and can consist of Time Study numbers, separated by
              spaces or commas, ranges of studies (for example, <i>11-62</i>) and the following aliases:<br>
              <blockquote><b>antimatter, infinity, time, active, passive, idle, light, dark</b></blockquote>
              A variable name may be used in place of Time Study list as well (see the definition panel),
              although in that case the shorthand aliases are not allowed.`
            },
          ]
        }
      ],
      examples: [
        "studies nowait purchase 11,21,31",
        "studies purchase 11-62, antimatter, 111, idle",
        "studies nowait purchase ec6Studies",
      ]
    },
    {
      id: 3,
      isUnlocked: () => true,
      keyword: "PRESTIGE",
      category: 1,
      syntax: `
        <b>infinity</b> [nowait]<br>
        <b>eternity</b> [nowait] [respec]<br>
        <b>reality</b> [nowait] [respec]`,
      description: `Triggers an Infinity, Eternity, or Reality reset if possible, otherwise the automator will wait at
        this command until it becomes possible.`,
      sections: [
        {
          name: "MODIFIERS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If it is not possible to prestige, move on to the next command instead of waiting.
              `
            },
            {
              header: "<i>respec</i>",
              description: `
                Eternity: Respec Time Studies and Eternity.<br>
                Reality: Unequip Glyphs and Reality.
              `
            },
          ]
        }
      ],
      examples: [
        "infinity",
        "eternity respec",
        "reality nowait",
      ]
    },
    {
      id: 4,
      isUnlocked: () => true,
      keyword: "UNLOCK",
      category: 1,
      syntax: "<b>unlock</b> [nowait] <u>feature</u>",
      description: "Unlocks the specified Eternity Challenge or Time Dilation.",
      sections: [
        {
          name: "MODIFIERS",
          items: [
            {
              header: "<i>nowait</i>",
              description: `
                If it is not possible to unlock, move on to the next command.
              `
            },
          ]
        }
      ],
      examples: [
        "unlock dilation",
        "unlock ec7"
      ]
    },
    {
      id: 5,
      isUnlocked: () => true,
      keyword: "START",
      category: 1,
      syntax: `
        <b>start</b> ec<u>N</u><br>
        <b>start</b> dilation`,
      description: `Start a specified Eternity Challenge or a Dilated Eternity. This command will also attempt
        to unlock the EC if not unlocked, but will not do the same for Dilation (use UNLOCK command to do that).`,
      examples: [
        "start ec12",
        "start dilation"
      ]
    },
    {
      id: 6,
      isUnlocked: () => true,
      keyword: "AUTO",
      category: 2,
      syntax: `<b>auto infinity</b> [setting]<br>
        <b>auto eternity</b> [setting]<br>
        <b>auto reality</b> [setting]`,
      description: `Turns prestige Autobuyers on or off and allows you to change their settings. If the setting option
        is not present, this command will toggle the Autobuyer state, turning it off if it is on and turning it on if
        it is off.`,
      sections: [
        {
          name: "SETTINGS",
          items: [
            {
              header: "<i>on</i> | <i>off</i>",
              description: "Turns specified Autobuyer on or off.",
            },
            {
              header: "<u><i>number</i></u> <u><i>time units</i></u>",
              description: `Usable with Infinity and Eternity only.
                Turns the Autobuyer on and set it to trigger at the given interval.`
            },
            {
              header: "<u><i>number</i></u> x highest",
              description: `Usable with Infinity and Eternity only. Turns the Autobuyer on and sets it to
                "X times highest" mode`
            },
            {
              header: "<i><u>number</u> <u>currency</u></i>",
              description: `Turns the Autobuyer on and sets it to trigger at a specific amount. The currency must
                match the autobuyer type (IP, EP, or RM). For the Reality Autobuyer, this will select "Reality
                Machines" mode`,
            },
          ]
        }
      ],
      examples: [
        "auto infinity on",
        "auto eternity off",
        "auto infinity 30s",
        "auto eternity 10 seconds",
        "auto eternity 1e100 x highest"
      ]
    },
    {
      id: 7,
      isUnlocked: () => BlackHole(1).isUnlocked,
      keyword: "BLACK HOLE",
      category: 2,
      syntax: "<b>black hole</b> <u>state</u>",
      description: `Toggles the speedup effect from the Black Hole on or off.`,
      examples: [
        "black hole on",
        "black hole off",
      ]
    },
    {
      id: 8,
      isUnlocked: () => Enslaved.isUnlocked,
      keyword: "STORE GAME TIME",
      category: 2,
      syntax: "<b>store game time</b> <u>action</u>",
      description: `Changes whether or not the Black Hole is storing time. Also allows usage of stored time.`,
      sections: [
        {
          name: "ACTIONS",
          items: [
            {
              header: "<i>on | off</i>",
              description: `
                Turns storing game time on or off.
              `
            },
            {
              header: "<i>use</i>",
              description: `
                Uses all stored game time. Does not alter the on/off state of time storage.
              `
            }
          ]
        }
      ],
      examples: [
        "store time on",
        "store time off",
        "store time use",
      ]
    },
    {
      id: 9,
      isUnlocked: () => true,
      keyword: "NOTIFY",
      category: 3,
      syntax: "<b>notify</b> \"<u>text</u>\"",
      description: `Takes the specified text and posts it in the top-right corner as
        a text notification, in the same spot and style as other notifications such as auto-save
        and achievement/upgrade unlocks. Can be useful for seeing automator status while
        on tabs other than the Automator tab.`,
      examples: [
        "notify \"Dilation reached\"",
        "notify \"ECs completed\""
      ]
    },
    {
      id: 10,
      isUnlocked: () => true,
      keyword: "Adding Comments",
      category: 3,
      syntax: "<b>#</b> text<br><b>//</b> text",
      description: `Allows you to leave a note to yourself within your script. This may be
        useful for organizing or keeping track of which parts of your script do various things,
        in a way that appears more readable than just the commands. These commands will do nothing
        positive or negative for the automator's functionality, and only serve as a tool to
        help you keep the steps of your scripts easier to follow if desired.`,
      examples: [
        "# get 1e20 before starting ec1",
        "// this loop alternates dilation and pushing"
      ]
    },
    {
      id: 11,
      isUnlocked: () => true,
      keyword: "WAIT",
      category: 4,
      syntax: "<b>wait</b> <u>condition</u>",
      description: `Forces Automator to wait for some condition or event. To wait for a certain duration of time,
        use the PAUSE command instead.`,
      sections: [
        {
          name: "CONDITIONS",
          items: [
            {
              header: "<i>comparison</i>",
              description: `
                Wait until the comparison statement is true. Check the entry for "Formatting Comparisons" for details
                on how to properly input this option.
              `
            },
            {
              header: "<i>prestige</i>",
              description: `
                Wait until the specified prestige (Infinity, Eternity, or Reality) has been triggered by its respective
                Autobuyer. This must happen <i>after</i> this command is reached; if the Autobuyer triggers
                <i>before</i> the command is reached, your script may get stuck.
              `
            }
          ]
        }
      ],
      examples: [
        "wait am >= 1e308",
        "wait pending completions >= 5",
        "wait ec9 completions >= 4",
        "wait infinity",
      ]
    },
    {
      id: 12,
      isUnlocked: () => true,
      keyword: "PAUSE",
      category: 4,
      syntax: "<b>pause</b> <u>interval</u>",
      description: `Tells the automator to stop moving forward and executing commands for a certain amount of time.
        Note that if the pause duration is shorter than the automator's execution speed, the automator will wait until
        the next execution tick before moving on.`,
      examples: [
        "pause 10s",
        "pause 1 minute",
        "pause 34 seconds"
      ],
      sections: [
        {
          name: "INTERVAL FORMATTING",
          items: [
            {
              header: "Specified Interval",
              description: `This command accepts time units of milliseconds ("ms"), seconds ("s", "sec", or "seconds"),
                minutes ("m", "min", or "minutes"), and hours ("h" or "hours"). You cannot provide just a number and
                nothing else; a unit of time must be specified.`,
            },
            {
              header: "Defined Constant",
              description: `A defined constant may be used instead, see the definition panel. The defined value will
                be assumed to be in units of seconds.`
            },
          ]
        },
        {
          name: "OTHER",
          items: [
            {
              header: "<b>Offine side-effects</b>",
              description: `This command may behave undesirably when it runs during offline progress due to limited
                tick count. A 1-second pause that is usually 20-30 ticks might be only 1 game tick when processing 8
                hours of offline progress, which might not be enough for the resources needed for the rest of the
                script.`,
            },
            {
              header: "<b>Alternatives</b>",
              description: `Using another command like 'WAIT' will allow you to set it for a certain resource amount,
                in order to ensure that the game has the proper state before moving onward.`
            }
          ]
        }
      ]
    },
    {
      id: 13,
      isUnlocked: () => true,
      keyword: "IF",
      category: 4,
      syntax: `<b>if</b> <u>condition</u> {<br>
        <blockquote>commands</blockquote>
        }`,
      description: `Defines an inner block of block of the automator script which will only be executed if the specified
        comparison is true when this line is reached. If the comparison is false, the automator will instead skip to the
        first line after the block and continue execution from there.`,
      examples: [
        "if ec10 completions < 5",
        "if ep > 1e6000"
      ]
    },
    {
      id: 14,
      isUnlocked: () => true,
      keyword: "UNTIL",
      category: 4,
      syntax: `<b>until</b> <u>comparison</u> {<br>
        <blockquote>commands</blockquote>
        }<br><b>until</b> <u>prestige_event</u> {<br>
          <blockquote>commands</blockquote>
        }`,
      description: `Defines an inner block of the script where commands are repeated; the comparison is checked at the
        start and every time the loop repeats. If the condition is false when the UNTIL statement is first reached, the
        inner block of commands will be skipped entirely.
        <br><br>
        If an prestige event (ie. Infinity, Eternity, or Reality) is specified instead of a condition, then the block
        will always be entered and the commands within the block will repeat until the event occurs for the first time
        <i>after</i> entering the block.`,
      examples: [
        "until ep > 1e500",
        "until reality",
      ]
    },
    {
      id: 15,
      isUnlocked: () => true,
      keyword: "WHILE",
      category: 4,
      syntax: `<b>while</b> <u>comparison</u> {<br>
        <blockquote>commands</blockquote>
      }`,
      description: `Defines an inner block of the script where commands are repeated; the comparison is checked at the
        start and every time the loop repeats. If the condition is false when the WHILE statement is first reached, the
        inner block of commands will be skipped entirely.`,
      examples: [
        `while ep < 1e500`,
        `while myThreshold > am`,
      ]
    },
    {
      id: 16,
      isUnlocked: () => true,
      keyword: "Currency List",
      category: 4,
      syntax: "<i>You can use these in any IF, WHILE, UNTIL, or WAIT command</i>",
      description: `This is a list of "currencies" or numbers that you can use within the Automator.<br>
        Note that when used, most currencies will need to be in scientific notation.<br>
        <b>am</b> - Current Antimatter amount  <br>
        <b>ip</b> - Current Infinity Point amount  <br>
        <b>ep</b> - Current Eternity Point amount  <br>
        <b>rm</b> - Current Reality Machine amount  <br>
        <b>infinities</b> - Current Infinity amount <br>
        <b>banked infinities</b> - Current Banked Infinity amount <br>
        <b>eternities</b> - Current Eternity amount <br>
        <b>realities</b> - Current Reality amount <br>
        <b>pending ip</b> - IP gained on Infinity (0 if not available)<br>
        <b>pending ep</b> - EP gained on Eternity (0 if not available)<br>
        <b>pending tp</b> - TP gained on exiting Dilation<br>
        <b>pending rm</b> - RM gained on Reality (0 if not available)<br>
        <b>pending glyph level</b> - Glyph Level gained on Reality (0 if not available)<br>
        <b>dt</b> - Current Dilated Time amount <br>
        <b>tp</b> - Current Tachyon Particle amount  <br>
        <b>rg</b> - Current Replicanti Galaxy amount (does not use scientific)<br>
        <b>rep</b> - Current Replicanti amount <br>
        <b>tt</b> - Current Time Theorem amount <br>
        <b>total tt</b> - TOTAL Time Theorems, includes all forms of generated TT and any spent on Studies <br>
        <b>total completions</b> - Total completions of all Eternity Challenges <br>
        <b>pending completions</b> - Total completions of current EC at Eternity <br>
        <b>ec<u>X</u> completions</b> - Amount of EC completions for a certain EC <br>
      `,
      examples: [
        `if total tt >= 5
        <blockquote>commands</blockquote>
        `,
        `while ec10 completions >= 1
        <blockquote>commands</blockquote>`
      ]
    },
    {
      id: 17,
      isUnlocked: () => true,
      keyword: "Formatting Comparisons",
      category: 4,
      syntax: "resource1 condition resource2",
      description: `
        Comparisons are used within certain commands, which allow you to control the behavior of the automator based
        on the game's current state. They have a standard format with two value inputs and a comparison operator, but
        the value inputs can be anything as long as it is formatted correctly overall.`,
      sections: [
        {
          name: "CONDITIONS",
          items: [
            {
              header: "<i>resource</i>",
              description: `
                This can be any Automator Currency, a defined constant, or a number which must be formatted in
                scientific notation (eg. 1000, 1e100, 1.8e308). Unlike more general programming languages, this must
                be a single value (ie. math expressions such as "ip + pending ip" are not allowed).
              `
            },
            {
              header: "<b>condition</i>",
              description: `
                This must be an inequality operator (<, <=, > >=), which takes on its typical mathematical meaning.
                Equality operators (==, !=) are not allowed, as the nature of the game means that numbers will often
                never be exactly equal and thus checking based on direct equality may lead to unexpected script
                behavior.
              `
            },
          ]
        }
      ],
      examples: [
        "ep < 1e20",
        "total tt > 14000",
      ]
    },
    {
      id: 18,
      isUnlocked: () => true,
      keyword: "Commands with inner blocks",
      category: 4,
      syntax: `<b>header_command</b> {<br>
        <blockquote>inner_commands</blockquote>
        }`,
      description: `Some commands are associated with an "inner block" of commands. This inner block can contain still
        contain any other valid command, but may or may not actually get executed based on what the state of the game is
        when <b>header_command</b> is executed. This allows you to repeat some commands over and over (eg. Time Study
        purchasing), or to skip them entirely (eg. not entering an EC if it already has full completions). These blocks
        can be nested if desired, with inner blocks being placed within one another.
        <br><br>
        In the text editor mode: Specify the inner block with curly braces, with the opening brace { on the same line as
        the comparison and the closing brace } on its own line after the last line you want inside the block
        <br><br>
        In the block editor mode: These commands come with an empty dotted rectangle which indicates which commands are
        within the inner block. Subsequent blocks can then be dragged inside the dotted rectangle.
        `,
      examples: [
        `if ec10 completions < 5 {<br>
          <blockquote>
          unlock ec10<br>
          start ec10</blockquote>
        }`,
        `until ep > 1e500 {<br>
          <blockquote>
          studies nowait 11-62</blockquote>
        }`
      ]
    },
  ]
};
