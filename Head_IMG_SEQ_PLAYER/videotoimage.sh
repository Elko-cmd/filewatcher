#!/bin/bash

# Function to process video files
process_videos() {
  local folder="$1"
  for file in "$folder"/*; do
    if [[ -d "$file" ]]; then
      # Recursively process subfolders
      process_videos "$file"
    elif [[ -f "$file" && ( "$file" == *.mp4 || "$file" == *.mkv || "$file" == *.avi || "$file" == *.mov ) ]]; then
      # Create an output directory for image sequences
      filename=$(basename -- "$file")
      filename="${filename%.*}"
      output_dir="$folder/$filename"

      # Create the output directory if it doesn't exist
      mkdir -p "$output_dir"

      # Convert the video to image sequence
      ffmpeg -i "$file" "$output_dir/frame_%04d.png"

      echo "Processed $file -> $output_dir"
    fi
  done
}

# Main script starts here
# Modify the following variable to point to the base directory containing the video files
base_dir="/Users/elko/Downloads/forElko (1)/240901/IVG_001"

# Watch the directory for new files
inotifywait -m -e create --format %f "$base_dir" | while read file; do
  if [[ "$file" == *.mp4 ]]; then
    process_videos "$base_dir"
  fi
done &

