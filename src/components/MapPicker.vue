<template>
    <div>
        <img :src="static_link" class="img img-responsive" v-if="static">
        <div class="map-wrapper" v-if="! static">
            <gmap-autocomplete
                @place_changed="setPlace"
                class="form-control search-address"
            >
            </gmap-autocomplete>
            <img src="http://restaurant.laraeast.com/images/marker.png"
                class="marker"
            >
            <GmapMap
                ref="map"
                :center="center"
                :zoom="7"
                :options="options"
                map-type-id="terrain"
                @dragend="setPosition"
                style="width: 100%; height: 300px"
            >
            </GmapMap>
        </div>
    </div>

</template>

<script>
  export default {
    props: {
      latitude: {
        required: false,
        default: parseFloat("31.2483151"),
      },
      longitude: {
        required: false,
        default: parseFloat("29.9798233"),
      },
      static: {
        required: false,
        default: false
      }
    },
    data() {
      return {
        center: {
          lat: parseFloat(this.latitude),
          lng: parseFloat(this.longitude),
        },
        options: {
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          disableDefaultUi: false
        },
        static_link: ''
      }
    },
    methods: {
      setPlace(place) {
        if (place.geometry) {
          this.center = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          this.$emit('place-changed', this.center, place.formatted_address);
        }
      },
      setPosition(event) {
        this.$refs.map.$mapPromise.then((map) => {
          this.center.lat = map.getCenter().lat();
          this.center.lng = map.getCenter().lng();

          this.axiosWithOutHeader.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.center.lat},${this.center.lng}&sensor=false&key=${this.MAP_KEY}&language=${this.$lang}`)
            .then(response => {
              if (response.data.status === 'OK') {
                this.$emit('place-changed', this.center, response.data.results[0].formatted_address);
              }
            })
        })
      }
    },
    mounted() {
      this.static_link = `https://maps.google.com/maps/api/staticmap?center=${this.center.lat},${this.center.lng}&zoom=10&size=300x200&scale=2&key=${process.env.MIX_GOOGLE_MAPS_KEY}`
    },
  }
</script>
<style scoped>
    .map-wrapper {
        position: relative;
        width: 100%;
        height: 300px;
    }

    .map-wrapper img.marker {
        position: absolute;
        z-index: 99;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -15px;
        height: 50px;
        width: 30px;
    }
    .map-wrapper input.search-address {
        /* position: absolute;
        z-index: 1;
        width: 100%; */
      height: 50px;
      border-radius: 30px;
      position: absolute;
      z-index: 9;
      outline:none;
      margin-top:10px;
      left:10px;
      right: 10px;
      width:calc(100% - 20px)
    }
</style>