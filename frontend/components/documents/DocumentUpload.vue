<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="2"
          color="indigo"
          v-bind="attrs"
          v-on="on"
          fab
          dark
          class="mx-2 sticky-bottom"
        >
          <v-icon dark>
              mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Hébergement de fichier</v-toolbar-title>
        </v-toolbar>
          <v-form>
            <v-stepper
              v-model="step"
              vertical
            >
              <v-stepper-step
                :complete="step > 1"
                step="1"
              >
                Choisir le fichier
                <small v-if="this.file">{{file.name}}</small>
              </v-stepper-step>

              <v-stepper-content step="1">
              <v-file-input
                truncate-length="50"
                placeholder="Cliquez pour choisir le fichier à héberger"
                @change="changeFile"
              ></v-file-input>
              <v-btn
                  color="primary"
                  @click="step = 2"
                  v-if="file"
              >
                  Choisir ce fichier
              </v-btn>
              </v-stepper-content>

              <v-stepper-step
              :complete="step > 2"
              step="2"
              >
              Attribuer des tags
              <small v-if="step == 3">
                <v-chip class="tag-chip" v-for="tag in model" :key="tag.text">{{tag.text}}</v-chip>
              </small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-alert
                  v-if="tagAlert.active"
                  type="warning"
                >{{tagAlert.message}}</v-alert>
                <v-combobox
                  v-model="model"
                  :filter="filter"
                  :hide-no-data="!search"
                  :items="items"
                  :search-input.sync="search"
                  class="autocomplete-tags"
                  hide-selected
                  label="Ajoutez des tags"
                  multiple
                  small-chips
                  solo
                >
                  <template v-slot:no-data>
                    <v-list-item @click="createTag">
                      <span class="subheading">Créer le tag</span>
                      <v-chip
                        :color="`${getFutureColor()} lighten-3`"
                        label
                        small
                      >
                        {{ search }}
                      </v-chip>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attrs, item, parent, selected }">
                    <v-chip
                      v-if="item === Object(item)"
                      v-bind="attrs"
                      :color="`${item.color} lighten-3`"
                      :input-value="selected"
                      label
                    >
                      <span class="pr-2">
                        {{ item.text }}
                      </span>
                      <v-icon
                        small
                        @click="parent.selectItem(item)"
                      >
                        $delete
                      </v-icon>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-chip
                      :color="`${item.color} lighten-3`"
                      label
                    >
                      {{ item.text }}
                    </v-chip>
                  </template>
                </v-combobox>
              <v-btn
                  color="primary"
                  @click="validTags"
              >
                  Valider les tags
              </v-btn>
              <v-btn text
                @click="step = 1"
              >
                  Changer de fichier
              </v-btn>
            </v-stepper-content>
            <v-stepper-step
              :complete="step > 3"
              step="3"
              >
              Envoyer le fichier
            </v-stepper-step>

            <v-stepper-content step="3">
              <v-btn
                color="primary"
                @click="sendFile"
              >Envoyer</v-btn>
              <v-btn
                @click="step = 2"
              >Retour</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
.sticky-bottom{
    position: absolute;
    bottom: 20px;
    right: 20px;
}
.subheading{
  margin-right: 5px;
}
.tag-chip{
  margin-top: 3px;
  margin-right: 3px;
}
</style>

<script>
const colors = ['green', 'purple', 'yellow', 'red', 'blue', 'orange']

export default {
    name: "DocumentUpload",
    data () {
        return {
            dialog: false,
            step: 1,
            file: null,
            activator: null,
            attach: null,
            colors: ['green', 'purple', 'yellow', 'red', 'blue', 'orange'],
            editing: null,
            editingIndex: -1,
            items: [
              { header: 'Choisissez un tag ou créez-en un' },
            ],
            menu: false,
            model: [],
            x: 0,
            search: null,
            y: 0,
            tagAlert: {
              active: false,
              message: ""
            }
        }
    },
    mounted() {
      const allTags = []
      const documents = this.$store.getters['document/getDocuments']
      for (const doc of documents){
        for (const tag of doc.tags){
          if (!allTags.includes(tag.value)){
            allTags.push(tag.value)
            this.items.push({
              text: tag.value,
              color: this.getNextColor()
            })
          }
        }
      }
    },
    watch: {
      model (val, prev) {
        const tagReg = new RegExp(/^[a-z0-9-]+$/gmi)

        if (val.length === prev.length) return

        if (this.tagAlert.active && val.length > 0){
          this.tagAlert = {
            active: false
          }
        }
        
        this.model = val.map(v => {
          if (typeof v === 'string' && tagReg.test(v)) {
            v = {
              text: v,
              color: this.getNextColor(),
            }
          } else if (typeof v === 'string' && !tagReg.test(v)) {
            this.tagAlert = {
              active: true,
              message: "Votre tag ne peut comporter que des lettres, chiffres et tirets"
            }
            return
          }

          return v
        })
      }
    },
    methods: {
      changeFile(e){
        this.file = e
      },
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.editingIndex = index
        } else {
          this.editing = null
          this.editingIndex = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      getNextColor(){
        const color = colors.pop()
        colors.unshift(color)
        return color
      },
      getFutureColor(){
        return colors[colors.length - 1]
      },
      validTags(){
        if (this.model.length == 0){
          this.tagAlert = {
            active: true,
            message: "Vous devez spécifier au moins un tag"
          }
        } else {
          this.step++
        }
      },
      createTag(){
        this.model.push({
          text: this.search,
          color: this.getNextColor()
        })
        this.tagAlert = {
          active: false
        }
        this.search = null
      },
      sendFile(){
        const tags = this.model.map(tag => tag.text)
        
        const data  = new FormData()
        data.append('file', this.file)
        data.append('tags', tags.join("|"))

        this.$axios.$post('/api/documents/upload',data)
          .then(res => this.$router.go(0))
          .catch(err => console.log(err))
      }
    }
}
</script>