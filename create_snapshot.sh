#!/bin/bash

# Output file name
OUTPUT_FILE="storefront_snapshot.txt"
# Patterns to exclude for the tree command
TREE_EXCLUDE_PATTERN=".git|.github|.next|.yarn|node_modules|yarn.lock|.gitignore|README.md|${OUTPUT_FILE}|create_snapshot.sh|*.png|*.jpg|*.jpeg|*.gif|*.svg|*.ico"

# --- Script Start ---

echo "Creating project snapshot..."

# Clear/Create the output file
> "$OUTPUT_FILE"

# Add project tree structure to the output file
echo "### Project Tree" >> "$OUTPUT_FILE"
echo "-----------------" >> "$OUTPUT_FILE"
tree -I "$TREE_EXCLUDE_PATTERN" >> "$OUTPUT_FILE"
echo -e "\n\n### File Contents" >> "$OUTPUT_FILE"
echo "------------------" >> "$OUTPUT_FILE"

# Find files, excluding specified directories, files, and image types, and append their content
find . \
    \( -path './.git' -o -path './.github' -o -path './.next' -o -path './.yarn' -o -path './node_modules' \) -prune \
    -o \( -name 'yarn.lock' -o -name '.gitignore' -o -name 'README.md' -o -name "$OUTPUT_FILE" -o -name 'create_snapshot.sh' \
         -o -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.gif' -o -name '*.svg' -o -name '*.ico' \) -prune \
    -o -type f -print | while IFS= read -r file; do
        echo -e "\n\n--- Start File: $file ---" >> "$OUTPUT_FILE"
        cat "$file" >> "$OUTPUT_FILE"
        # Add a newline at the end of the file content if missing, for better separation
        [[ $(tail -c1 "$file" | wc -l) -eq 0 ]] && echo >> "$OUTPUT_FILE"
        echo "--- End File: $file ---" >> "$OUTPUT_FILE"
done

echo "Project snapshot saved to $OUTPUT_FILE"
# --- Script End ---

# To make this script executable:
# chmod +x create_snapshot.sh
# To run this script:
# ./create_snapshot.sh
