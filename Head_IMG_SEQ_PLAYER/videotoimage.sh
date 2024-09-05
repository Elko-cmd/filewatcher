#!/bin/bash

# Function to process a single video file
process_video() {
  local file="$1"
  local output_folder="$2"

  # Check if the file is a supported video format
  if [[ -f "$file" && ( "$file" == *.mp4 || "$file" == *.mkv || "$file" == *.avi || "$file" == *.mov ) ]]; then
    # Extract the filename without extension
    filename=$(basename -- "$file")
    filename="${filename%.*}"
    output_dir="$output_folder/$filename"

    # Create the output directory if it doesn't exist
    mkdir -p "$output_dir"

    # Convert the video to an image sequence
    ffmpeg -i "$file" "$output_dir/frame_%04d.png"

    echo "Processed $file -> $output_dir"
  fi
}

# Main script starts here
# Modify these variables to point to the appropriate directories
input_base_dir="/Users/elko/Downloads/forElko (1)/240901/IVG_001"
output_base_dir="/Users/elko/Downloads/forElko (1)/240901/IVG_001/images"

# Watch the directory for new files and process them
fswatch -0 -e ".*" -i "\\.mp4$" "$input_base_dir" | while read -d "" event; do
  process_video "$event" "$output_base_dir"
done
