#########################################################################################################
# Sass Configuration
Sass::Script::Number.precision = 20

# General
relative_assets = true
asset_cache_buster :none

# Sass Directories
http_path = ""
css_dir = "assets/css"
sass_dir = "assets/sass"
images_dir = "assets/images"
javascripts_dir = "assets/js"

# Enable Debugging
if environment == :production
  output_style = :compressed
  line_comments = false
else
  output_style = :expanded
  sass_options = { :debug_info => false }
end


# Before production :
# $ compass compile -e production --force
