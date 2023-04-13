<script>
  import Heading from "./lib/Heading.svelte"
  import NCL from "./lib/NCL.svelte"
  import Speeds from "./lib/Speeds.svelte"
  import Resources from "./lib/Resources.svelte"
  import Traits from "./lib/Traits.svelte"
  import Skills from "./lib/Skills.svelte"
  import Demise from "./lib/Demise.svelte"
  import ToolSkills from "./lib/ToolSkills.svelte"
  import WeaponSkills from "./lib/WeaponSkills.svelte"
  import Currency from "./lib/Currency.svelte"
  import Inventory from "./lib/Inventory.svelte"
  import Abilities from "./lib/Abilities.svelte"
  import Focus from "./lib/Focus.svelte"
  import Footer from "./lib/Footer.svelte"
  import CharacterWizard from "./lib/wizard/CharacterWizard.svelte"
</script>

<div class="container">
<CharacterWizard />
<Heading />
<hr>
<NCL />
<hr>
<Speeds />
<hr>
<div class="container">
  <div class="d-flex parent-container">
    <Resources />
    <div class="justify-content-end">
      <Demise />
    </div>
  </div>
</div>
<hr>
<div class="container">
  <div class="d-flex parent-container">
    <Traits />
    <Skills />
  </div>
</div>
<hr> 
<ToolSkills />
<hr>
<WeaponSkills />
<hr>
<Currency />
<Inventory />
<hr>
<Focus />
<hr>
<Abilities />
<hr>
<Footer />
</div>