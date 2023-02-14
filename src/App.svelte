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
</script>

<Heading></Heading>
<hr>
<NCL></NCL>
<hr>
<Speeds></Speeds>
<hr>
<div class="container">
  <div class="d-flex parent-container">
    <Resources></Resources>
    <div class="justify-content-end">
      <Demise></Demise>
    </div>
  </div>
</div>
<hr>
<div class="container">
  <div class="d-flex parent-container">
    <Traits></Traits>
    <Skills></Skills>
  </div>
</div>
<hr> 
<ToolSkills></ToolSkills>
<hr>
<WeaponSkills></WeaponSkills>
<hr>
<Currency></Currency>
<hr>
<Inventory></Inventory>
<hr>
<Focus></Focus>
<hr>
<Abilities></Abilities>
<hr>
<Footer></Footer>