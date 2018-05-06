# frozen_string_literal: true

# Mocky is a test framework agnostic mocking library.
# Mocky does nothing about assertions. It is just a mock.
class Mocky
  def self.instance_of(clazz)
    raise ArgumentError, "#{clazz} is not a class" if !clazz.is_a?(Class)
    new(clazz: clazz)
  end

  private_class_method :new

  def initialize(clazz:)
    @class_name = clazz.name
    @methods = Set.new(clazz.instance_methods)
    @args_array_by_method = {}
  end

  # Defines a mock method. It raises an exception if a given method name
  # does not exist. This helps you realize quickly that your test is outdated
  # when an interface of target class is changed in future.
  def fake(method_name)
    if !@methods.include?(method_name.to_sym)
      raise ArgumentError, "#{@class_name} does not have a method '#{method_name}'"
    end

    @args_array_by_method[method_name] = args_array = []
    define_singleton_method(method_name) do |*args|
      args_array << args
      yield(*args)
    end
  end

  def args(method_name)
    array = @args_array_by_method[method_name]
    raise ArgumentError, "fake of '#{method_name}' is not created" if array.nil?
    array
  end

  def call_count(method_name)
    args(method_name).size
  end
end
