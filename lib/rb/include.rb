# Require gems
require 'rubygems'
require 'bundler'
Bundler.setup(:default, :ci)
require 'firebase'
# Require room object
require_relative './room.rb'