<script>
import NCL from "./NCL.svelte"

let character = {
  name: "",
  class: "",
  species: "",
  level: "",
  guard: "",
  dive: "",
  initiative: "",
  threshold: "",
  lpace: "",
  wpace: "",
  fpace: "",
  maxHP: "",
  currentHP: "",
  maxMana: "",
  currentMana: "",
  maxRecovery: "",
  expendedRecovery: "",
  manaCeiling: "",
  demise: "",
  fatigue: "",
  power: "",
  speed: "",
  forethought: "",
  instinct: "",
  panache: "",
  grace: "",
  guile: "",
}

let step = 1;
  
  function nextStep() {
    step++;
  }
  
  function prevStep() {
    step--;
  }
  
  function finish() {
    goto("/");
  }

  
</script>

  {#if step === 1}
    <NCL {character} />
  {:else if step === 2}
    <label>
      Class:
      <select bind:value={character.class}>
        <option value="">--Please choose a class--</option>
        <option value="Warrior">Warrior</option>
        <option value="Mage">Mage</option>
        <option value="Rogue">Rogue</option>
      </select>
    </label>
    
    <label>
      Race:
      <select bind:value={character.race}>
        <option value="">--Please choose a race--</option>
        <option value="Human">Human</option>
        <option value="Elf">Elf</option>
        <option value="Dwarf">Dwarf</option>
      </select>
    </label>
  {:else if step === 3}
    <h2>Attributes</h2>
    
    <label>
      Strength:
      <input type="number" bind:value={character.strength} />
    </label>

{/if}

<div class="d-flex justify-content-center">
  <div>
    <button class="btn btn-outline-secondary" on:click={prevStep}>Back</button>
    <button class="btn btn-outline-secondary" on:click={nextStep}>Next</button>
  </div>
</div>
