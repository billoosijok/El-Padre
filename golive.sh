yarn build
git add .
read -p "What's new: " commit_message
git commit -m "Publish: $commit_message"
git push